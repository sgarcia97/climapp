import { View, Text } from "react-native"
import { styles } from "../styles/styles"

type SubtitleType = {
    title:string;
    isDay:number
}
const Subtitle = ({title, isDay}:SubtitleType) => {
    let backStyle = null
    let textStyle = null
    if(isDay == 0){
        backStyle = styles.backBlue
        textStyle = styles.textDark
    }
    return(
        <View><Text style={[styles.subtitle,textStyle]}>{title}</Text></View>
    )
}

export default Subtitle