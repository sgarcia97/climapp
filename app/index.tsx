import { StatusBar } from "expo-status-bar";
import styles from "../styles/styles";
import { View, Text, TextInput } from "react-native";
import { useRouter } from "expo-router";
import ClimButton from "../components/ClimButton";
import Template from "../components/Template";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

const Landing = () => {
  const { session, isGuest, signIn, signUp, enterAsGuest } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // route authenticated or guest
  useEffect(() => {
    if (session || isGuest) {
      router.replace("(tabs)");
    }
  }, [session, isGuest, router]);

  const handleGuest = () => {
    enterAsGuest();
    router.push("(tabs)");
  };

  const handleSignIn = async () => {
    try {
      await signIn(email, password);
    } catch (error: any) {
      console.error("Sign-in failed: ", error.message);
    }
  };

  const handleSignUp = () => {
    router.push("/signup");
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
      ></TextInput>
      <TextInput
        placeholder="Password"
        style={styles.defaultInput}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      ></TextInput>
      <ClimButton title="LOGIN" color="black" onClick={handleSignIn} />
      <ClimButton title="Sign Up" onClick={handleSignUp} />
      <ClimButton title="Guest" onClick={handleGuest} />
      <StatusBar style="auto" />
    </Template>
  );
};

export default Landing;
