import { Text, View } from "react-native";
import { supabase } from "../../api/UserApi";
import styles from "../../styles/styles";
import Template from "../../components/Template";
import Card from "../../components/Card";
import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { useAuth } from "../../contexts/AuthContext";
import { useLocation } from "../../utils/Location";
import {
  loadLocations,
  syncLocationsToSupabase,
} from "../../api/LocationService";
import { SavedLocation } from "../../types/climappTypes";
import { saveLocationsToStorage } from "../../api/LocationService";

import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = () => {
  const [user, setUser] = useState<User | null>(null);
  const { session, isGuest } = useAuth();
  const [fetchError, setFetchError] = useState<string | null>(null);
  const { coordinates, locationDetails, locationErrorMsg, getLocation } =
    useLocation();
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  useEffect(() => {
    const fetchUserAndUpdateLocations = async () => {
      if (isGuest || !session) {
        setUser(null);
        return;
      }

      setIsLoadingLocation(true);

      try {
        // get latest loc
        const { coordinates: newCoords, locationDetails: newGeocode } =
          await getLocation();

        const { data, error } = await supabase.auth.getUser();
        if (error) throw error;
        setUser(data?.user || null);

        //const stored = await AsyncStorage.getItem("locations");
        //console.log("AsyncStorage before load:", stored);

        // load locations
        let savedLocations = (await loadLocations(session.user.id)) || [];
        console.log("Loaded from loadLocations:", savedLocations);

        if (newCoords) {
          const currentLocation: SavedLocation = {
            id: "my_location",
            coordinates: newCoords,
            geocode: newGeocode,
          };

          // remove duplicates
          savedLocations = savedLocations.filter(
            (loc: any) =>
              loc.id !== "my_location" &&
              !(
                Math.abs(loc.coordinates.latitude - newCoords.latitude) <
                  0.001 &&
                Math.abs(loc.coordinates.longitude - newCoords.longitude) <
                  0.001
              )
          );
          // store new location at the beginning
          savedLocations.unshift(currentLocation);
          console.log("After adding currentLocation:", savedLocations);

          // max 5 rule
          if (savedLocations.length > 5) {
            savedLocations = savedLocations.slice(0, 5);
          }
          console.log("Final savedLocations:", savedLocations);

          console.log(`Saving to local: ${savedLocations.length}`);
          // save to local
          await saveLocationsToStorage(savedLocations);

          console.log(`Syncing to Supabase: ${savedLocations.length}`);
          // sync to supabase
          await syncLocationsToSupabase(session.user.id);

          console.log("Updated saved locations:", savedLocations);

          const checks = await AsyncStorage.getItem("locations");
          console.log("local data: ", checks);
        }
      } catch (error: any) {
        console.error("Error updating locations:", error.message);
      } finally {
        setIsLoadingLocation(false);
      }
    };

    fetchUserAndUpdateLocations();
  }, [session, isGuest]);

  // welcome message
  const welcomeTitle = isGuest
    ? "Welcome Guest"
    : user
      ? `Welcome, ${user.user_metadata.display_name || user.email}`
      : "Welcome";

  return (
    <Template title={welcomeTitle}>
      {fetchError && <Text style={styles.errorText}>{fetchError}</Text>}
      {locationErrorMsg && (
        <Text style={styles.errorText}>{locationErrorMsg}</Text>
      )}
      {isLoadingLocation ? (
        <Text>Loading location...</Text>
      ) : (
        <Text>Your area | {locationDetails?.city || "Unknown"}</Text>
      )}
      <View style={styles.cardWrapper}>
        <Card
          title="Temperature"
          img={require("../../assets/temp.png")}
          val="20"
        />
        <Card
          title="Feels like (Real feel)"
          img={require("../../assets/eye.png")}
          val="15"
        />
        <Card
          title="Precipitation"
          img={require("../../assets/cloud.png")}
          val="10%"
        />
        <Card
          title="Humidity"
          img={require("../../assets/humidity.png")}
          val="84%"
        />
        <Card title="UV Index" img={require("../../assets/eye.png")} val="3" />
        <Card
          title="Air Quality"
          img={require("../../assets/eye.png")}
          val="10"
        />
        <Card
          title="Cloud Cover"
          img={require("../../assets/eye.png")}
          val="25%"
        />
        <Card
          title="Visibility"
          img={require("../../assets/eye.png")}
          val="36km"
        />
      </View>
    </Template>
  );
};

export default Home;
