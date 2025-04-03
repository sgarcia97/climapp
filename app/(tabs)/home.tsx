import { Text, View, ActivityIndicator, Image} from "react-native";
import Search from "../../components/Search"
import moment from "moment";
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
import { weather } from "../../api/WeatherApi"

import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = () => {
  const [user, setUser] = useState<User | null>(null);
  const { session, isGuest } = useAuth();
  const [data, setData] = useState<any>(null)
  const [fetchError, setFetchError] = useState<string | null>(null);
  const { coordinates, locationDetails, locationErrorMsg, getLocation } =
    useLocation();
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  
 
  useEffect(()=>{
    weather.then(dat => setData(dat))
  },[])
  
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

  // Weather data
  if(!data){ return <ActivityIndicator/>}
  return (
    <Template >
      <Search/>
      {fetchError && <Text style={styles.errorText}>{fetchError}</Text>}
      {locationErrorMsg && (
        <Text style={styles.errorText}>{locationErrorMsg}</Text>
      )}
      {isLoadingLocation ? (
        <Text>Loading location...</Text>
      ) : (
        
        <View><Text>Your area | {/*locationDetails?.city || "Unknown"*/data.location.name}</Text><Text style={{color:"#999999"}}>Last updated {moment(data.last_updated).format('ddd MMM d [at] h:mma')}</Text></View>
      )}
      <View><Text style={styles.subtitle}>Today's Weather</Text></View>
      <View style={styles.cardBig}>
      <Image style={styles.bigIcon} source={require('../../assets/weather/temperature.png')}/>
        <View style={styles.cardSectionLeft}><Text style={styles.cardSectionTitle}>{Math.round(data.current.temp_c)}</Text></View>
        <View 
        style={styles.cardSectionRight}>
          <Text>Real feel <Text style={styles.bold}>{Math.round(data.current.feelslike_c)}</Text></Text>
          <Text>Wind Chill <Text style={styles.bold}>{Math.round(data.current.windchill_c)}</Text></Text>
          <Text style={styles.bold}>{data.current.condition.text}</Text>
        </View>
      </View>
      <View><Text style={styles.subtitle}>Hourly Forecast</Text></View>
      <View><Text style={styles.subtitle}>Daily Forecast</Text></View>
      <View style={styles.dayWrapper}>
        {
          data.forecast.forecastday.map((item:any,i:number)=>(
            <View key={i} style={styles.day}>
              <View style={styles.dayTitleWrapper}>
              <Text style={styles.dayTitle}>{moment(item.date).format('ddd')}</Text>
              <Image style={styles.smallIcon} source={require('../../assets/weather/summer.png')}/>
              </View>
              <Text>{Math.round(item.day.maxtemp_c)}</Text>
              <Text>{Math.round(item.day.mintemp_c)}</Text>
            </View>
          ))
        }
      </View>
      <View style={styles.cardWrapper}>
        <Card
          title="Precipitation"
          img={require("../../assets/cloud.png")}
          val={data.current.precip_mm}
        />
        <Card
          title="Humidity"
          img={require("../../assets/humidity.png")}
          val={data.current.humidity+"%"}
        />
        <Card title="UV Index" img={require("../../assets/eye.png")} val={data.current.uv} />
        <Card
          title="Air Quality"
          img={require("../../assets/eye.png")}
          val="10"
        />
        <Card
          title="Cloud Cover"
          img={require("../../assets/eye.png")}
          val={data.current.cloud+'%'}
        />
        <Card
          title="Visibility"
          img={require("../../assets/eye.png")}
          val={data.current.vis_km}
        />
      </View>
    </Template>
  );
};

export default Home;
