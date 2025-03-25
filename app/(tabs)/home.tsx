import { Text, View } from "react-native";
import { supabase } from "../../api/UserApi";
import styles from "../../styles/styles";
import Template from "../../components/Template";
import Card from "../../components/Card";
import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { useAuth } from "../../contexts/AuthContext";
import { useLocation } from "../../utils/Location";

const Home = () => {
  const [user, setUser] = useState<User | null>(null);
  const { session, isGuest } = useAuth();
  const [fetchError, setFetchError] = useState<string | null>(null);
  const { coordinates, cityInfo, locationErrorMsg, getLocation } =
    useLocation();
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  useEffect(() => {
    setIsLoadingLocation(true);
    getLocation().finally(() => setIsLoadingLocation(false));

    if (isGuest || !session) {
      setUser(null);
      return;
    }

    const checkUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) throw error;
        setUser(data?.user || null);
      } catch (error: any) {
        console.error("Error fetching user:", error.message);
        setFetchError("Failed to load user data");
      }
    };

    if (session) {
      checkUser();
    }
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
