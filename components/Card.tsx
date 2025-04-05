import { View, Text, Image } from 'react-native'
import { styles } from '../styles/styles'

type CardProps = {
    title:string;
    img:any;
    val:any;
    isDay:number
}
const Card = ({title, img, val, isDay}:CardProps) => {
    let backStyle = null
    let textStyle = null
    if(isDay == 0){
        backStyle = styles.backBlue
     
    }
    return(
        <View style={[styles.card, backStyle]}>
            <View style={styles.cardContent}>
            <View style={styles.cardHeader}><Image style={styles.cardImage} source={img}/><Text style={textStyle}>{title}</Text></View>
            <View><Text style={[styles.metric, textStyle]}>{val}</Text></View>
            </View>
        </View>
    )
}

export default Card