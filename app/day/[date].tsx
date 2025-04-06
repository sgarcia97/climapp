import { useLocalSearchParams } from "expo-router";
import {View, Text, ScrollView, TouchableOpacity} from "react-native"
import Subtitle from "../../components/Subtitle";
import { Image } from "react-native";
import { styles, blue } from "../../styles/styles";
import clothing from "../../api/ClothingApi";
import moment from "moment";
import Spacer from "../../components/Spacer";
import { useRouter } from 'expo-router'

const Info = () => {
    const router = useRouter()
    const params = useLocalSearchParams<any>()
    const cl = clothing.find((item)=>{
        return params.avgtemp_c <= item.temphigh && params.avgtemp_c >= item.templow
    })

    return(
        <ScrollView stickyHeaderIndices={[0]}>
        <TouchableOpacity onPress={()=>router.back()} ><View style={styles.backWrapper}><Image style={{width:25, height:25}} source={require('../../assets/arrow.png')}/><Text style={{fontWeight:700, fontSize:18}}>Back</Text></View></TouchableOpacity>
        <View style={styles.mainView}>
        <View style={styles.cardBig}>
            <Text style={{color:blue, fontSize:40, fontWeight:800}}>{moment(params.date).format('ddd MMM M')}</Text>
            <Text style={{fontSize:16, fontWeight:800}}>Average Temperature: 
                <Text> {Math.round(params.avgtemp_c)+'\u00B0'}C</Text>
            </Text>
            <Text style={{fontSize:16, fontWeight:800}}>Max Temperature: 
                <Text> {Math.round(params.maxtemp_c)+'\u00B0'}C</Text>
            </Text>
            <Text style={{fontSize:16, fontWeight:800}}>Min Temperature: 
                <Text> {Math.round(params.mintemp_c)+'\u00B0'}C</Text>
            </Text>
            <Text>Chance of Rain: {params.daily_chance_of_rain}%</Text>
            <Text>Will it Rain: {params.daily_will_it_rain}%</Text>
            <Text>Chance of Snow: {params.daily_chance_of_snow}%</Text>
            <Text>Will it Snow: {params.daily_will_it_snow}%</Text>
            <Text>Max Wind: {params.maxwind_kph}km</Text>
        </View>
        <Subtitle title="Recommended Clothing" isDay={1}/>
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
          <Text>{params.daily_will_it_rain > 10 ? 'You will need an umbrella' : params.daily_will_it_rain < 10 && params.daily_will_it_rain > 2 ? 'You may not need an umbrella' : 'You do not need an umbrella'}</Text></View>
        </View>
        </View>
        <Spacer/>
        </ScrollView>
    )
}

export default Info