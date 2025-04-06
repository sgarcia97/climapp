import { Text, View, ActivityIndicator, Image, ScrollView, RefreshControl, Platform} from "react-native";
import Search from "../../components/Search"
import moment from "moment";
import { supabase } from "../../api/UserApi";
import { styles, pink, blue } from "../../styles/styles";
import Template from "../../components/Template";
import Day from "../../components/Day";
import Hour from "../../components/Hour";
import Card from "../../components/Card";
import Subtitle from "../../components/Subtitle";
import { Title, Paragraph } from "../../components/Title";
import { useState, useEffect, useCallback } from "react";
import { User } from "@supabase/supabase-js";
import { useAuth } from "../../contexts/AuthContext";
import { useLocation } from "../../utils/Location";
import Spacer from "../../components/Spacer";
import { weatherIcons } from "../../components/WeatherIcons";
import { useRouter } from "expo-router";
import {
  loadLocations,
  syncLocationsToSupabase,
} from "../../api/LocationService";
import { SavedLocation } from "../../types/climappTypes";
import { saveLocationsToStorage } from "../../api/LocationService";
import { weatherApi, astronomyApi, marineApi } from "../../api/WeatherApi"
import clothing from "../../api/ClothingApi"
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = () => {
  const [user, setUser] = useState<User | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const { session, isGuest } = useAuth();
  const [data, setData] = useState<any>(null)
  const [adata, setAdata] = useState<any>(null)
  const [mdata, setMdata] = useState<any>(null)
  const [fetchError, setFetchError] = useState<string | null>(null);
  const router = useRouter()
  const { coordinates, locationDetails, locationErrorMsg, getLocation } =
    useLocation();
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  useEffect(() => {
    const fetchUserAndUpdateLocations = async () => {
      const { coordinates: newCoords, locationDetails: newGeocode } =
          await getLocation();
      if (isGuest || !session) {
        setUser(null);
        return;
      }

      setIsLoadingLocation(true);

      try {
        // get latest loc
        

        const { data, error } = await supabase.auth.getUser();
        if (error) throw error;
        setUser(data?.user || null);

        //const stored = await AsyncStorage.getItem("locations");
        //console.log("AsyncStorage before load:", stored);

        // load locations
        let savedLocations = (await loadLocations(session.user.id)) || [];
        //console.log("Loaded from loadLocations:", savedLocations);

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
          //console.log("After adding currentLocation:", savedLocations);

          // max 5 rule
          if (savedLocations.length > 5) {
            savedLocations = savedLocations.slice(0, 5);
          }
          //console.log("Final savedLocations:", savedLocations);

          //console.log(`Saving to local: ${savedLocations.length}`);
          // save to local
          await saveLocationsToStorage(savedLocations);

          //console.log(`Syncing to Supabase: ${savedLocations.length}`);
          // sync to supabase
          await syncLocationsToSupabase(session.user.id);

          //console.log("Updated saved locations:", savedLocations);

          const checks = await AsyncStorage.getItem("locations");
          //console.log("local data: ", checks);
        }
      } catch (error: any) {
        //console.error("Error updating locations:", error.message);
      } finally {
        setIsLoadingLocation(false);
      }
    };

    fetchUserAndUpdateLocations();
  }, [session, isGuest]);

  const q = coordinates ? coordinates.latitude+','+coordinates.longitude : 'auto:ip'

  useEffect(()=>{
    weatherApi(q).then(dat => setData(dat))
    astronomyApi(q).then(ast => setAdata(ast))
    marineApi(q).then(ast => setMdata(ast))
  },[])

  // welcome message
  const welcomeTitle = isGuest
    ? "Welcome Guest"
    : user
      ? `Welcome, ${user.user_metadata.display_name || user.email}`
      : "Welcome";

  // Pull to Refresh content
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    weatherApi(q).then(dat => {setData(dat)})
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
      }, []);
  
  // Weather data
  if(!data){ return <View style={{flex:1,padding:30}}><ActivityIndicator color={blue}/></View>}
  const id = 1//data && data.current.is_day
  const ico = weatherIcons.find((i)=>{
    return i.code === data.current.condition.code
  })
  const cl = clothing.find((i)=>{
    return (Math.round(data.current.feelslike_c) <= i.temphigh && Math.round(data.current.feelslike_c) >= i.templow )
  })

  return (
    <Template isDay={id}>  
    
      <ScrollView stickyHeaderIndices={[0]} style={styles.scrView} refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
        <View style={styles.searchHomeWrapper}>
    <View style={{paddingBottom:10}}><Text style={{color:"#fff", fontWeight:700}}>{welcomeTitle}</Text></View>
    <Search/>
      
    </View>    
      <View style={styles.mainView}>
      
      {fetchError && <Text style={styles.errorText}>{fetchError}</Text>}
      {locationErrorMsg && (
        <Text style={styles.errorText}>{locationErrorMsg}</Text>
      )}
      {isLoadingLocation ? (
        <Text>Loading location...</Text>
      ) : (
        <View>
        <View style={{display:"flex", flexDirection:"row", gap:5}}><Image style={{width:15, height:15}}source={require('../../assets/location.png')}/><Paragraph title={`${data.location.name} | ${locationDetails?.street}, ${locationDetails?.city}`} isDay={id}/></View>
        <Text style={{color:"#999999"}}>Last updated {moment(data.current.last_updated).format('ddd MMM M [at] h:mma')}</Text></View>
   
      )}
            
     
      <Subtitle title="Today's Weather" isDay={id}/>
      <View style={styles.cardBig}>
        <View style={styles.cardBigSection}>
      <Image style={styles.bigIcon} source={{ uri:data.current.is_day == 1 ? ico?.icon : ico?.iconn}}/>
        <View style={styles.cardSectionLeft}><Text style={styles.cardSectionTitle}>{Math.round(data.current.temp_c)+'\u00B0'}</Text></View>
        <View 
        style={styles.cardSectionRight}>
          <Text>Real feel <Text style={styles.bold}>{Math.round(data.current.feelslike_c)+'\u00B0'}</Text></Text>
          <Text>Wind Chill <Text style={styles.bold}>{Math.round(data.current.windchill_c)+'\u00B0'}</Text></Text>
          <Text style={styles.bold}>{data.current.condition.text}</Text>
        </View>
        </View>
        <View><Text style={{fontWeight:400, textAlign:"center", fontSize:16}}>The temperature is currently <Text style={styles.boldBlue}>{ cl?.title}</Text></Text>    
        </View>
      </View>
      
      <Subtitle title="Hourly Forecast" isDay={id}/>
      </View>
      
      <ScrollView horizontal >
        <View style={styles.hourWrapper}>
        <Hour date="Now" onClick={()=>router.navigate({pathname:`hour/${data.current.last_updated}`,params:data.current})} img={data.current.is_day == 1 ? ico?.icon : ico?.iconn} temp={data.current.temp_c} condition={data.current.condition.text} feel={data.current.feelslike_c} />
      {
        data.forecast.forecastday.map((item:any,i:number)=>(
          
          item.hour.map((h:any,i:number)=>{
            const icon = weatherIcons.find((i)=>{
              return i.code === h.condition.code
            })
            const cd = moment(data.current.last_updated).format('YYYY-MM-DD HH:mm')
            const wd = moment(h.time).format('YYYY-MM-DD HH:mm')
   
            if(wd > cd){
            return <Hour key={i} onClick={()=>router.navigate({pathname:`hour/${h.time}`,params:h})} img={h.is_day == 1 ? icon?.icon : icon?.iconn } date={moment(h.time).format('h A')} temp={h.temp_c} feel={h.feelslike_c} condition={h.condition.text}/>
            }
          })
        ))
      }
      </View>
      </ScrollView>
      <View style={styles.mainView}>
      <Subtitle title="Recommended Clothing for Now" isDay={id}/>
      <View style={styles.cardBig}>
        <View style={styles.clothrec}><View style={styles.clothsect}><Image style={styles.mediumIcon} source={require('../../assets/tshirt.png')}/><Text style={styles.boldBlue}>Shirt</Text></View> 
        <Text>{cl?.shirt}</Text></View>
        <View style={styles.clothrec}><View style={styles.clothsect}><Image style={styles.mediumIcon} source={require('../../assets/jeans.png')}/><Text style={styles.boldBlue}>Pants</Text></View>
        <Text>{cl?.pants}</Text></View>
        <View style={styles.clothrec}><View style={styles.clothsect}><Image style={styles.mediumIcon} source={require('../../assets/sneaker.png')}/><Text style={styles.boldBlue}>Shoes</Text></View>
        <Text>{cl?.shoes}</Text></View>
        <View style={styles.clothrec}><View style={styles.clothsect}><Image style={styles.mediumIcon} source={require('../../assets/varsity-jacket.png')}/><Text style={styles.boldBlue}>Overalls</Text></View> 
        <Text>{cl?.top}</Text></View>
        <View style={styles.clothrec}><View style={styles.clothsect}><Image style={styles.mediumIcon} source={require('../../assets/winter-gloves.png')}/><Text style={styles.boldBlue}>Accesories</Text></View> 
        <Text>{cl?.acc}</Text></View>
        <View style={styles.clothrec}><View style={styles.clothsect}><Image style={styles.mediumIcon} source={require('../../assets/weather/umbrella.png')}/><Text style={styles.boldBlue}>Umbrella</Text></View> 
          <Text>{data.current.daily_will_it_rain > 10 ? 'You will need an umbrella' : data.current.daily_will_it_rain < 10 && data.current.daily_will_it_rain > 2 ? 'You may not need an umbrella' : 'You do not need an umbrella'}</Text></View>
      </View>
      <Subtitle title="What's the next week looking like" isDay={id}/>
      <View style={styles.dayWrapper}>
        {
         
          data.forecast.forecastday.map((item:any,i:number)=>{
            const icon = weatherIcons.find((i)=>{
              return i.code === item.day.condition.code
            })
            
            return <Day 
              key={i}
              onClick={()=>router.navigate({pathname:`day/${item.date}`,params:item.day})}
              img={icon?.icon}
              min={item.day.mintemp_c} 
              max={item.day.maxtemp_c} 
              date={item.date}
              isDay={id}
              condition={item.day.condition.text}
              />
})
        }
      </View>
      <View style={styles.cardWrapper}>
        <Card
          title="Precipitation"
          img={require("../../assets/weather/umbrella.png")}
          val={data.current.precip_mm}
          isDay={data.current.is_day}
        />
        <Card
          title="Humidity"
          img={require("../../assets/weather/humidity.png")}
          val={data.current.humidity+"%"}
          isDay={data.current.is_day}
        />
        
        <Card 
          title="UV Index" 
          img={require("../../assets/ultraviolet.png")} 
          val={data.current.uv} 
          isDay={data.current.is_day} 
        />
        <Card
          title="Heat Index"
          img={require("../../assets/weather/heat.png")}
          val={data.current.heatindex_c}
          isDay={data.current.is_day}
        />
        <Card
          title="Cloud Cover"
          img={require("../../assets/weather/cloudy.png")}
          val={data.current.cloud+'%'}
          isDay={data.current.is_day}
        />
        <Card
          title="Visibility"
          img={require("../../assets/visibility.png")}
          val={data.current.vis_km}
          isDay={data.current.is_day}
        />
        <Card
          title="Pressure"
          img={require("../../assets/weather/pressure.png")}
          val={data.current.pressure_mb}
          isDay={data.current.is_day}
        />
        <Card
          title="Wind Speed"
          img={require("../../assets/weather/windy.png")}
          val={data.current.wind_kph}
          isDay={data.current.is_day}
        />
      </View>
      <Subtitle title="Look to the Skies" isDay={id}/>
      { adata &&
        <View style={styles.cardMedium}>
          <View>
            <Image source={require('../../assets/weather/first-quarter.png')} style={{width:90, height:90}}/>
            <Text style={{fontSize:18, fontWeight:700, color:"#0000000"}}>{adata.astronomy.astro.moon_phase}</Text></View>
          <View style={styles.cardMediumSectionWrapper}>
          <View style={styles.cardMediumSection}><Image source={require('../../assets/weather/sunrise.png')} style={styles.smallIcon}/><Text>Sunrise - {adata.astronomy.astro.sunrise}</Text></View>
          <View style={styles.cardMediumSection}><Image source={require('../../assets/weather/sunset.png')} style={styles.smallIcon}/><Text>Sunset - {adata.astronomy.astro.sunset}</Text></View>
          <View style={styles.cardMediumSection}><Image source={require('../../assets/weather/moonrise.png')} style={styles.smallIcon}/><Text>Moonrise - {adata.astronomy.astro.moonrise}</Text></View>
          <View style={styles.cardMediumSection}><Image source={require('../../assets/weather/moonset.png')} style={styles.smallIcon}/><Text>Moonset - {adata.astronomy.astro.moonset}</Text></View>
          </View>
        </View>
      
        }
        <Subtitle title="Sail the Seas" isDay={id}/>
        <View style={styles.cardBig}>
        { mdata && mdata.error ? <Text>No data found for this location</Text> :

        mdata.forecast.forecastday[0].day.tides[0].tide.map((t:any,i:number)=>(
       <View key={i} style={styles.marine}><Image style={styles.mediumIcon} source={ t.tide_type == "HIGH" ? require('../../assets/weather/high-tide.png') : require('../../assets/weather/low-tide.png') }/>
                  <View>
                    <Text style={styles.boldBlue}>{t.tide_type} TIDE</Text>
                    <Text>Height of tide: {t.tide_height_mt} meters</Text>
                    <Text>Time of tide: {moment(t.tide_time).format('h:mm A')}</Text>
                  </View>
                </View>
        
        ))
        
      
        }
        </View>
        <Spacer/>
      </View>
      </ScrollView>
    </Template>
  );
};

export default Home;
