import { SavedLocation } from "../types/climappTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { supabase } from "./UserApi";

// save local
export const saveLocationsToStorage = async (locations: SavedLocation[]) => {
  try {
    await AsyncStorage.setItem("locations", JSON.stringify(locations));
  } catch (error) {
    console.error("Error saving locations to AsyncStorage:", error);
  }
};

// load local
export const loadLocationsFromStorage = async (): Promise<SavedLocation[]> => {
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
  try {
    const currentLocations = (await loadLocationsFromStorage()) || [];

    // create savedlocation object
    const locationWithId: SavedLocation = {
      ...location,
      id: uuid.v4(),
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
  try {
    // local
    const localLocations = await loadLocationsFromStorage();
    if (localLocations) return localLocations;

    // fallback to data from Supabase
    const { data, error } = await supabase
      .from("profiles")
      .select("preferences")
      .eq("id", userId)
      .single();

    if (error) throw new Error("Failed to fetch preferences: " + error.message);

    const savedLocations = data?.preferences?.saved_locations || [];

    // save local
    await saveLocationsToStorage(savedLocations);

    return savedLocations;
  } catch (error: any) {
    console.error("Error loading locations:", error);
    return [];
  }
};

// sync with supabase
export const syncLocationsToSupabase = async (userId: string) => {
  try {
    const locations = (await loadLocationsFromStorage()) || [];

    const { error } = await supabase
      .from("profiles")
      .update({
        preferences: {
          saved_locations: locations,
        },
      })
      .eq("id", userId);

    if (error) throw new Error("Failed to sync locations: " + error.message);

    return { success: true };
  } catch (error: any) {
    console.error("Error syncing locations:", error);
    throw error;
  }
};
