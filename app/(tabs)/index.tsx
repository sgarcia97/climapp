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
        <Card title="Temperature" img={require('../../assets/temp.png')} val="20"/>
        <Card title="Feels like (Real feel)" img={require('../../assets/eye.png')} val="15"/>
        <Card title="Precipitation" img={require('../../assets/cloud.png')} val="10%"/>
        <Card title="Humidity" img={require('../../assets/humidity.png')} val="84%"/>
        <Card title="UV Index" img={require('../../assets/eye.png')} val="3"/>
        <Card title="Air Quality" img={require('../../assets/eye.png')} val="10"/>
        <Card title="Cloud Cover" img={require('../../assets/eye.png')} val="25%"/>
        <Card title="Visibility" img={require('../../assets/eye.png')} val="36km"/>
        </View>
        </Template>
    )
}

export default Home;