import { StatusBar } from "expo-status-bar";
import { styles } from "../../styles/styles";
import { ScrollView, Text, TextInput, View, Image} from "react-native";
import { useRouter } from "expo-router";
import ClimButton from "../../components/ClimButton";
import Template from "../../components/Template";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const Login = () => {
  const { signIn, enterAsGuest } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // signin handler
  const handleSignIn = async () => {
    try {
      setErrorMessage("");
      await signIn(email, password);
      setEmail("");
      setPassword("");
    } catch (error: any) {
      console.error("Sign-in failed:", error.message);
      setErrorMessage(error.message || "Sign-in failed");
    }
  };

  // go to signup
  const handleSignUp = () => {
    router.push("/(auth)/signup");
  };

  // enter guest mode
  const handleGuest = () => {
    enterAsGuest();
  };

  return (
    <Template vCentered={true} topGuard={true}>
      <View style={styles.staticView}>
        <Image style={styles.logo} source={require('../../assets/logo.png')}/>
      <View style={[styles.titleWrapper]}><Text style={[styles.title, styles.center]}>Welcome to Climapp</Text></View>
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
      <TextInput
        placeholder="Email Address or Username"
        style={styles.defaultInput}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        style={styles.defaultInput}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <ClimButton title="LOGIN" color="#0023C4" onClick={handleSignIn} />
      <ClimButton title="Sign Up" color="#FF5CF3" onClick={handleSignUp} />
      <ClimButton title="Guest" onClick={handleGuest} />
      <StatusBar style="auto" />
      </View>
    </Template>
  );
};

export default Login;
