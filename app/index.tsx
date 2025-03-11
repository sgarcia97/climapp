import { StatusBar } from 'expo-status-bar';
import styles from "../styles/styles"
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router'
import ClimButton from "../components/ClimButton"

const Landing = () => {
    const handleGuest = () => {
        router.push('(tabs)')
    }

    const handleSignIn = () => {
        router.push('/signin')
    }

    const handleSignUp = () => {
        router.push('/signup')
    }
  return (
    <View style={styles.container}>
      <Text style={styles.defaultTitle}>Welcome to ClimApp</Text>
      <ClimButton title="Sign in" onClick={handleSignIn}/>
      <ClimButton title="Sign Up" onClick={handleSignUp}/>
      <ClimButton title="Guest" onClick={handleGuest}/>
      <StatusBar style="auto" />
    </View>
  );
}



export default Landing;
