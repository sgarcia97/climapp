import { StatusBar } from "expo-status-bar";
import styles from "../../styles/styles";
import { Text, TextInput, View } from "react-native";
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
    <Template title="Welcome to Climapp" vCentered={true}>
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
      <ClimButton title="LOGIN" color="black" onClick={handleSignIn} />
      <ClimButton title="Sign Up" onClick={handleSignUp} />
      <ClimButton title="Guest" onClick={handleGuest} />
      <StatusBar style="auto" />
    </Template>
  );
};

export default Login;
