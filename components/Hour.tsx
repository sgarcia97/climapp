import { View, Text, Image } from 'react-native'
import { styles, blue, pink } from '../styles/styles'
type HourTypes = {
    date:string,
    icon?:string,
    temp:number,
    feel:number
}
const Hour = ({date, icon, temp, feel}:HourTypes) => {
    return(
        <View style={styles.hour}>
            <Text>{date}</Text>
            <Image style={styles.smallIcon} source={require('../assets/weather/summer.png')}/>
            <Text style={[styles.hourTemp]}>
                <Text style={{color:pink}}>{Math.round(temp)+'\u00B0'}</Text> | <Text style={{color:blue}}>{Math.round(feel)+'\u00B0'}</Text></Text>
        </View>
    )
}

export default Hour