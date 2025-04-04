import { View, Text, StyleSheet, TouchableHighlight } from 'react-native' 
import { styles } from '../styles/styles'

type ButtonProps = {
    title:string;
    color?:string;
    onClick: () => void
}

const ClimButton = ({title, color='#000',onClick}:ButtonProps) => {
    return(
        <TouchableHighlight onPress={onClick}>
            <View style={[styles.button,{backgroundColor:color}]} >
                <Text style={styles.buttonTitle}>{title}</Text>
            </View>
        </TouchableHighlight>
    )
}



export default ClimButton