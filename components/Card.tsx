import { View, Text, Image } from 'react-native'
import { styles } from '../styles/styles'

type CardProps = {
    title:string;
    img:any;
    val:any;
}
const Card = ({title, img, val}:CardProps) => {
    return(
        <View style={styles.card}>
            <View style={styles.cardContent}>
            <View style={styles.cardHeader}><Image style={styles.cardImage} source={img}/><Text>{title}</Text></View>
            <View><Text style={styles.metric}>{val}</Text></View>
            </View>
        </View>
    )
}

export default Card