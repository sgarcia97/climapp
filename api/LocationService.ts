import { SavedLocation } from "../types/climappTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { supabase } from "./UserApi";

// save local
export const saveLocationsToStorage = async (locations: SavedLocation[]) => {
  console.log("> saveLocationsToStorage");
  try {
    const storedData = await AsyncStorage.getItem("locations");
    let existingLocations: SavedLocation[] = storedData
      ? JSON.parse(storedData)
      : [];

    const myLocation = existingLocations.find(
      (loc) => loc.id === "my_location"
    );

    if (myLocation) {
      locations = locations.map((loc) =>
        loc.id === "my_location" ? { ...myLocation, ...loc } : loc
      );
    }

    await AsyncStorage.setItem("locations", JSON.stringify(locations));
    console.log("Saved locations successfully:", locations);
  } catch (error) {
    console.error("Error saving locations to AsyncStorage:", error);
  }
};

// load local
export const loadLocationsFromStorage = async (): Promise<SavedLocation[]> => {
  console.log("> loadLocationsFromStorage");
  try {
    const storedLocations = await AsyncStorage.getItem("locations");
    return storedLocations ? JSON.parse(storedLocations) : [];
  } catch (error) {
    console.error("Error loading locations from AsyncStorage:", error);
    return [];
  }
};

// delete local
export const deleteLocationFromStorage = async (location: SavedLocation) => {
  console.log("> deleteLocationFromStorage");
  try {
    const locations = await loadLocationsFromStorage();
    const updatedLocations = locations.filter(
      (savedLocation) =>
        savedLocation.coordinates?.latitude !==
          location.coordinates?.latitude ||
        savedLocation.coordinates?.longitude !== location.coordinates?.longitude
    );
    await saveLocationsToStorage(updatedLocations);
  } catch (error) {
    console.error("Error deleting location from AsyncStorage:", error);
  }
};

// add local
export const addLocation = async (location: Omit<SavedLocation, "id">) => {
  console.log("> addLocation");
  try {
    const currentLocations = (await loadLocationsFromStorage()) || [];

    // create savedlocation object
    const locationWithId: SavedLocation = {
      ...location,
      id: uuid.v4() as string,
    };

    // update locations
    const updatedLocations = [...currentLocations, locationWithId];

    // save local
    await saveLocationsToStorage(updatedLocations);

    return updatedLocations;
  } catch (error: any) {
    console.error("Error adding location:", error);
  }
};

// remove local
export const removeLocation = async (locationId: string) => {
  console.log("> removeLocation");
  try {
    const currentLocations = (await loadLocationsFromStorage()) || [];
    const updatedLocations = currentLocations.filter(
      (loc) => loc.id !== locationId
    );

    await saveLocationsToStorage(updatedLocations);

    return updatedLocations;
  } catch (error: any) {
    console.error("Error removing location:", error);
  }
};

// load from supabase
export const loadLocations = async (userId: string) => {
  console.log("> LoadLocations");
  try {
    // local
    //const localLocations = await loadLocationsFromStorage();
    //if (localLocations.length > 0) return localLocations;

    // fallback to data from Supabase
    const { data, error } = await supabase
      .from("profiles")
      .select("saved_locations")
      .eq("id", userId)
      .single();

    if (error)
      throw new Error("Failed to fetch saved location: " + error.message);

    const savedLocations = data?.saved_locations || [];

    // save local
    await saveLocationsToStorage(savedLocations);

    return savedLocations;
  } catch (error: any) {
    console.error("Error loading locations:", error);
    return [];
  }
};

// sync with supabase
// export const syncLocationsToSupabase = async (userId: string) => {
//   console.log("> syncLocationsToSupabase");
//   try {
//     const localLocations = (await loadLocationsFromStorage()) || [];
//     console.log("Loaded from loadLocationsFromStorage:", localLocations);

//     // get latest copy
//     const { data, error: fetchError } = await supabase
//       .from("profiles")
//       .select("saved_locations")
//       .eq("id", userId)
//       .single();

//     if (fetchError)
//       throw new Error(
//         "Failed to fetch existing locations: " + fetchError.message
//       );

//     const existingLocations = Array.isArray(data?.saved_locations)
//       ? data?.saved_locations
//       : [];
//     // merge and avoid dupes
//     const mergedLocations = [
//       ...existingLocations.filter(
//         (remoteLoc: SavedLocation) =>
//           !localLocations.some((localLoc) => localLoc.id === remoteLoc.id)
//       ),
//       ...localLocations,
//     ];

//     // update to supabase
//     const { error } = await supabase
//       .from("profiles")
//       .update({ saved_locations: mergedLocations })
//       .eq("id", userId);

//     if (error) throw new Error("Failed to sync locations: " + error.message);

//     return { success: true };
//   } catch (error: any) {
//     console.error("Error syncing locations:", error);
//     throw error;
//   }
// };

export const syncLocationsToSupabase = async (userId: string) => {
  console.log("> syncLocationsToSupabase");

  try {
    // get local
    const localLocations = (await loadLocationsFromStorage()) || [];
    console.log("Loaded from local storage:", localLocations);

    // push
    const { error } = await supabase
      .from("profiles")
      .update({ saved_locations: localLocations })
      .eq("id", userId);

    if (error) throw new Error("Failed to sync locations: " + error.message);

    return { success: true };
  } catch (error: any) {
    console.error("Error syncing locations:", error);
    throw error;
  }
};
