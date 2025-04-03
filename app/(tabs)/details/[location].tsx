import { Text, View, ActivityIndicator, Image} from "react-native";
import Search from "../../../components/Search"
import Template from "../../../components/Template"
import Card from "../../../components/Card"
import moment from "moment";
import styles from "../../../styles/styles";
import { useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react"

const Location = () => {
    const [data, setData] = useState<any>(null)
    const {location} = useLocalSearchParams<{location:string}>()
    useEffect(()=>{
        const wApi = async (location:string) => {
            try{
                const response = await fetch("https://api.weatherapi.com/v1/forecast.json?key=1f571ab3d93c4dab9ac195429252603&q="+location+"&days=3&aqi=yes&alerts=yes")
                const dat = await response.json()
                setData(dat)
            }catch(error){
                console.error(error)
            }
        
        }
        wApi(location)
    },[location])

    if(!data){ return <ActivityIndicator/>}
  return (
    <Template title={decodeURIComponent(location)}>
        <View><Text>Your area | {/*locationDetails?.city || "Unknown"*/data.location.name}</Text><Text style={{color:"#999999"}}>Last updated {moment(data.last_updated).format('ddd MMM d [at] h:mma')}</Text></View>
      
      <View><Text style={styles.subtitle}>Today's Weather</Text></View>
      <View style={styles.cardBig}>
      <Image style={styles.bigIcon} source={require('../../../assets/weather/temperature.png')}/>
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
              <Image style={styles.smallIcon} source={require('../../../assets/weather/015-rain.png')}/>
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
          img={require("../../../assets/cloud.png")}
          val={data.current.precip_mm}
        />
        <Card
          title="Humidity"
          img={require("../../../assets/humidity.png")}
          val={data.current.humidity+"%"}
        />
        <Card title="UV Index" img={require("../../../assets/eye.png")} val={data.current.uv} />
        <Card
          title="Air Quality"
          img={require("../../../assets/eye.png")}
          val="10"
        />
        <Card
          title="Cloud Cover"
          img={require("../../../assets/eye.png")}
          val={data.current.cloud+'%'}
        />
        <Card
          title="Visibility"
          img={require("../../../assets/eye.png")}
          val={data.current.vis_km}
        />
      </View>
    </Template>
  );
}

export default Location