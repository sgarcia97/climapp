import { Text, View, ActivityIndicator, Image, ScrollView, RefreshControl} from "react-native";
import Template from "../../components/Template"
import Hour from "../../components/Hour"
import Day from "../../components/Day"
import Card from "../../components/Card"
import Spacer from "../../components/Spacer"
import moment from "moment";
import { styles } from "../../styles/styles";
import { useLocalSearchParams } from "expo-router"
import { useEffect, useState, useCallback } from "react"
import { astro } from "../../api/WeatherApi";


const Location = () => {
    const [data, setData] = useState<any>(null)
    const [adata, setAdata] = useState<any>(null)
    const [refreshing, setRefreshing] = useState<boolean>(false)
    const {location} = useLocalSearchParams<{location:string}>()

    // Fetch data by Location

    const wApi = async (location:string) => {
      try{
          const response = await fetch("https://api.weatherapi.com/v1/forecast.json?key=1f571ab3d93c4dab9ac195429252603&q="+location+"&days=3&aqi=yes&alerts=yes")
          const dat = await response.json()
          setData(dat)
      }catch(error){
          console.error(error)
      }
  
  }


    useEffect(()=>{
        wApi(location)
        astro.then(ast => setAdata(ast) )
    },[location])

  // Pull to Refresh content
    const onRefresh = useCallback(() => {
      setRefreshing(true);
      wApi(location)
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }, []);



  // Weather data
  if(!data){ return <ActivityIndicator/>}
  return (
    <Template>  
      <ScrollView style={styles.scrView} refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
            <View style={styles.mainView}>
      <View style={[styles.titleWrapper]}><Text style={styles.title}>{decodeURIComponent(location)}</Text></View>
        
        <View><Text>Your area | {/*locationDetails?.city || "Unknown"*/data.location.name}</Text><Text style={{color:"#999999"}}>Last updated {moment(data.current.last_updated).format('ddd MMM d [at] h:mma')}</Text></View>
  
      <View><Text style={styles.subtitle}>Today's Weather</Text></View>
      <View style={styles.cardBig}>
      <Image style={styles.bigIcon} source={require('../../assets/weather/temperature.png')}/>
        <View style={styles.cardSectionLeft}><Text style={styles.cardSectionTitle}>{Math.round(data.current.temp_c)+'\u00B0'}</Text></View>
        <View 
        style={styles.cardSectionRight}>
          <Text>Real feel <Text style={styles.bold}>{Math.round(data.current.feelslike_c)+'\u00B0'}</Text></Text>
          <Text>Wind Chill <Text style={styles.bold}>{Math.round(data.current.windchill_c)+'\u00B0'}</Text></Text>
          <Text style={styles.bold}>{data.current.condition.text}</Text>
        </View>
      </View>
      <View><Text style={styles.subtitle}>Hourly Forecast</Text></View>
      </View>
      
      <ScrollView horizontal >
        <View style={styles.hourWrapper}>
        <Hour date="Now" temp={data.current.temp_c} feel={data.current.feelslike_c} icon=""/>
      {
        data.forecast.forecastday.map((item:any,i:number)=>(
          
          item.hour.map((h:any,i:number)=>{
            const cd = moment(data.current.last_updated).format('YYYY-MM-DD HH:mm')
            const wd = moment(h.time).format('YYYY-MM-DD HH:mm')
            if(wd > cd){
            return <Hour key={i} date={moment(h.time).format('ha')} temp={h.temp_c} feel={h.feelslike_c} icon=""/>
            }
          })
        ))
      }
      </View>
      </ScrollView>
      <View style={styles.mainView}>
      <View><Text style={styles.subtitle}>Daily Forecast</Text></View>
      <View style={styles.dayWrapper}>
        {
          data.forecast.forecastday.map((item:any,i:number)=>(
            <Day key={i} min={item.day.mintemp_c} max={item.day.maxtemp_c} date={item.date}/>
            
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
          title="Heat Index"
          img={require("../../assets/eye.png")}
          val={data.current.heatindex_c}
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
        <Card
          title="Pressure"
          img={require("../../assets/eye.png")}
          val={data.current.pressure_mb}
        />
        <Card
          title="Wind Speed"
          img={require("../../assets/eye.png")}
          val={data.current.wind_kph}
        />
      </View>
      { adata &&
   
      
        
   <View style={styles.cardMedium}>
     <View>
       <Image source={require('../../assets/weather/first-quarter.png')} style={styles.bigIcon}/>
       <Text style={{fontSize:18, fontWeight:700, color:"#0000000"}}>{adata.astronomy.astro.moon_phase}</Text></View>
     <View style={styles.cardMediumSectionWrapper}>
     <View style={styles.cardMediumSection}><Image source={require('../../assets/weather/sunrise.png')} style={styles.smallIcon}/><Text>Sunrise - {adata.astronomy.astro.sunrise}</Text></View>
     <View style={styles.cardMediumSection}><Image source={require('../../assets/weather/sunset.png')} style={styles.smallIcon}/><Text>Sunset - {adata.astronomy.astro.sunset}</Text></View>
     <View style={styles.cardMediumSection}><Image source={require('../../assets/weather/moonrise.png')} style={styles.smallIcon}/><Text>Moonrise - {adata.astronomy.astro.moonrise}</Text></View>
     <View style={styles.cardMediumSection}><Image source={require('../../assets/weather/moonset.png')} style={styles.smallIcon}/><Text>Moonset - {adata.astronomy.astro.moonset}</Text></View>
     </View>
   </View>
 
   }
   <Spacer/>
      </View>
      </ScrollView>
    </Template>
  );
}

export default Location