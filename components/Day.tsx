import { View, Text, Image } from 'react-native'
import { styles } from '../styles/styles'
import moment from 'moment'
type DayTypes = {
    max:number,
    min:number,
    date:string
}
const Day = ({max, min, date}:DayTypes) => {
    return(
        <View style={styles.day}>
            <View style={styles.dayTitleWrapper}>
            <Text style={styles.dayTitle}>{moment(date).format('ddd')}</Text>
            <Image style={styles.smallIcon} source={require('../assets/weather/summer.png')}/>
            </View>
            <Text>{Math.round(max)+'\u00B0'}</Text>
            <Text>{Math.round(min)+'\u00B0'}</Text>
        </View>
    )
}

export default Day