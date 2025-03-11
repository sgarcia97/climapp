import { View, Text, Image } from 'react-native'
import styles from '../styles/styles'

type CardProps = {
    title:string;
    img?:string;
    val:string;
}
const Card = ({title, img, val}:CardProps) => {
    return(
        <View style={styles.card}>
            <View style={styles.cardContent}>
            <View><Image/><Text>{title}</Text></View>
            <View><Text style={styles.metric}>{val}</Text></View>
            </View>
        </View>
    )
}

export default Card