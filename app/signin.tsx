import { useState } from "react";
import { TextInput, Text, View, Alert } from "react-native";
import ClimButton from "../components/ClimButton";
import Template from "../components/Template";
import styles from "../styles/styles";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "expo-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    try {
      await signIn(email, password);
      Alert.alert("Success", "Logged in successfully!");
      router.push("/newsfeed"); // Redirect after login
    } catch (error: any) {
      Alert.alert("Login Failed", error.message || "An error occurred");
    }
  };

  return (
    <Template title="Login" vCentered={true}>
      <TextInput
        placeholder="Email Address"
        style={styles.defaultInput}
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        placeholder="Password"
        style={styles.defaultInput}
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <ClimButton title="LOGIN" color="magenta" onClick={handleLogin} />
    </Template>
  );
};

export default Login;
