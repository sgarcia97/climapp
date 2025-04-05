import { useLocalSearchParams } from "expo-router";
import {View, Text, ScrollView} from "react-native"
import Subtitle from "../../components/Subtitle";
import { Image } from "react-native";
import { styles, blue } from "../../styles/styles";
import clothing from "../../api/ClothingApi";
import moment from "moment";

const Info = () => {
    const params = useLocalSearchParams<any>()
    const cl = clothing.find((item)=>{
        return params.feelslike_c <= item.temphigh && params.feelslike_c >= item.templow
    })

    return(
        <ScrollView>
        <View style={styles.mainView}>
        <View style={styles.cardBig}>
            <Text style={{color:blue, fontSize:20, fontWeight:800}}>{moment(params.time).format('h:mm A')}</Text>
            <Text style={{fontSize:16, fontWeight:800}}>Temperature: 
                <Text style={styles.boldBlue}> {params.temp_c+'\u00B0'}C</Text>
            </Text>
            <Text style={{fontSize:16, fontWeight:800}}>Feels like: 
                <Text style={styles.boldBlue}> {params.feelslike_c+'\u00B0'}C</Text>
            </Text>
            <Text style={{fontSize:16, fontWeight:800}}>Wind Chill: 
                <Text style={styles.boldBlue}> {params.feelslike_c+'\u00B0'}C</Text>
            </Text>
            <Text style={{fontSize:16, fontWeight:800}}>Heat Index: 
                <Text style={styles.boldBlue}> {params.heatindex_c+'\u00B0'}C</Text>
            </Text>
            <Text>Chance of Rain: {params.chance_of_rain}%</Text>
            <Text>Will it Rain: {params.will_it_rain}%</Text>
            <Text>Chance of Snow: {params.chance_of_snow}%</Text>
            <Text>Will it Snow: {params.will_it_snow}%</Text>
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
          <Text>{params.will_it_rain > 10 ? 'You will need an umbrella' : params.will_it_rain < 10 && params.will_it_rain > 2 ? 'You may not need an umbrella' : 'You do not need an umbrella'}</Text></View>
        </View>
        </View>
        </ScrollView>
    )
}

export default Info