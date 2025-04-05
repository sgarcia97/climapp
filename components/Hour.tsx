import { View, Text, Image, TouchableOpacity } from 'react-native'
import { styles, blue, pink } from '../styles/styles'
type HourTypes = {
    date:string;
    img?:string;
    temp:number;
    feel:number;
    condition?:string;
    onClick:(value:any)=> void
}
const Hour = ({date, img, temp, feel, condition, onClick}:HourTypes) => {
    return(
        <TouchableOpacity onPress={onClick}>
        <View style={styles.hour}>
            <Text>{date}</Text>
            <Image style={styles.mediumIcon} source={{ uri: img}}/>
            <Text numberOfLines={1} style={{fontSize:10}}>{condition}</Text>
            <Text style={[styles.hourTemp]}>
                <Text style={{color:pink}}>{Math.round(temp)+'\u00B0'}</Text> | <Text style={{color:blue}}>{Math.round(feel)+'\u00B0'}</Text></Text>
        </View>
        </TouchableOpacity>
    )
}

export default Hour