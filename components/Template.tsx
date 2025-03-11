import {ScrollView, View, Text} from 'react-native'
import styles from '../styles/styles'

type TemplateProps = {
    children:any;
    title?:string;
}
const Template = ({children, title=""}:TemplateProps) => {
    return(
        <ScrollView style={styles.mainView}>
            <View style={styles.titleWrapper}><Text style={styles.title}>{title}</Text></View>
            {children}
        </ScrollView>
    )
}

export default Template