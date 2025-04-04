import { View, Text, Image } from 'react-native'
import { styles } from '../styles/styles'

type CardProps = {
    title:string;
    img:any;
    val:any;
}
const CardMedium = ({title, img, val}:CardProps) => {
    return(
        <View style={styles.cardMedium}>
        <View>
        <Image source={require(img)} style={styles.bigIcon}/>
        <Text style={{fontSize:18, fontWeight:700, color:"#0000000"}}>{title}</Text></View>
      <View style={styles.cardMediumSectionWrapper}>
      <View style={styles.cardMediumSection}><Image source={require(val.valImg1)} style={styles.smallIcon}/><Text>Sunrise - {val.val1}</Text></View>
      <View style={styles.cardMediumSection}><Image source={require(val.valImg2)} style={styles.smallIcon}/><Text>Sunset - {val.val2}</Text></View>
      <View style={styles.cardMediumSection}><Image source={require(val.valImg3)} style={styles.smallIcon}/><Text>Moonrise - {val.val3}</Text></View>
      <View style={styles.cardMediumSection}><Image source={require(val.valImg4)} style={styles.smallIcon}/><Text>Moonset - {val.val4}</Text></View>
      </View>
    </View>
    )
}

export default CardMedium