import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import styles from '../../styles/styles'
import Template from '../../components/Template'
import Card from '../../components/Card'
const Home = () => {
    return(
        <Template title="Welcome Guest">
        <Text>Your area | Calgary</Text>
        <View style={styles.cardWrapper}>
        <Card title="Temperature" img="" val="20"/>
        <Card title="Feels like (Real feel)" img="" val="15"/>
        <Card title="Precipitation" img="" val="10%"/>
        <Card title="Humidity" img="" val="84%"/>
        <Card title="UV Index" img="" val="3"/>
        <Card title="Air Quality" img="" val="10"/>
        <Card title="Cloud Cover" img="" val="25%"/>
        <Card title="Visibility" img="" val="36km"/>
        </View>
        </Template>
    )
}

export default Home;