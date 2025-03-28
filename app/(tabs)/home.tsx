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
import uuid from "react-native-uuid";
import { saveLocationsToStorage } from "../../api/LocationService";

const Home = () => {
  const [user, setUser] = useState<User | null>(null);
  const { session, isGuest } = useAuth();
  const [fetchError, setFetchError] = useState<string | null>(null);
  const { coordinates, cityInfo, locationErrorMsg, getLocation } =
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
        await getLocation();
        const { data, error } = await supabase.auth.getUser();
        if (error) throw error;
        setUser(data?.user || null);

        // load locations
        let savedLocations = (await loadLocations(session.user.id)) || [];

        // create new saved location object from current location
        const currentLocation: SavedLocation = {
          id: uuid.v4(),
          coordinates: coordinates,
          cityInfo: cityInfo,
          locationErrorMsg: null,
        };

        // reserve first slot for my location
        if (savedLocations.length > 0) {
          savedLocations[0] = currentLocation;
        } else {
          savedLocations.push(currentLocation);
        }

        // save to local
        await saveLocationsToStorage(savedLocations);
        // sync to supabase
        await syncLocationsToSupabase(session.user.id);

        console.log("Updated saved locations:", savedLocations);
      } catch (error: any) {
        console.error("Error updating locations:", error.message);
      } finally {
        setIsLoadingLocation(false);
      }
    };

    fetchUserAndUpdateLocations();
  }, [session, isGuest, getLocation]);

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
        <Text>Your area | {cityInfo?.city || "Unknown"}</Text>
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
