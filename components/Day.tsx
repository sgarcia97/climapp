import { View, Text, Image, TouchableOpacity } from 'react-native'
import { styles, blue, pink} from '../styles/styles'
import moment from 'moment'
type DayTypes = {
    max:number;
    min:number;
    date:string;
    isDay:number;
    img:any;
    condition:string;
    onClick: (value:any) => void
}
const Day = ({max, min, date, isDay, img, condition, onClick}:DayTypes) => {
    let backStyle = null
    let textStyle = null
    if(isDay == 0){
        backStyle = styles.backBlue
    
    }
    return(
<TouchableOpacity onPress={onClick}>
        <View style={[styles.day, backStyle]}>
            <View style={styles.dayTitleWrapper}>
            <Text style={[styles.dayTitle, textStyle]}>{moment(date).format('ddd')}</Text>
            <Image style={styles.smallIcon} source={{uri:img}}/>
            <Text>{condition}</Text>
            </View>
            <View style={{display:'flex', justifyContent:"space-between", flexDirection:"row", width:100}}>
            <Text style={{color:blue, fontWeight:600}}>{Math.round(max)+'\u00B0'}</Text>
            <Text style={{color:pink, fontWeight:600}}>{Math.round(min)+'\u00B0'}</Text>
            </View>
        </View>
        </TouchableOpacity>
    )
}

export default Day