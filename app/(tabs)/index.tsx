import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Template from '../../components/Template'

const Home = () => {
    return(
        <Template title="Welcome Guest">
        <Text>Your area | Calgary</Text>
        </Template>
    )
}

export default Home;