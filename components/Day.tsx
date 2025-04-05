import { View, Text, Image } from 'react-native'
import { styles, blue, pink} from '../styles/styles'
import moment from 'moment'
type DayTypes = {
    max:number;
    min:number;
    date:string;
    isDay:number;
    img:any;
    condition:string;
}
const Day = ({max, min, date, isDay, img, condition}:DayTypes) => {
    let backStyle = null
    let textStyle = null
    if(isDay == 0){
        backStyle = styles.backBlue
    
    }
    return(
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
    )
}

export default Day