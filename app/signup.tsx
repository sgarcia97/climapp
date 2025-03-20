import { useState } from "react";
import { TextInput, Text, View, Alert } from "react-native";
import ClimButton from "../components/ClimButton";
import Template from "../components/Template";
import styles from "../styles/styles";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "expo-router";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signUp } = useAuth();
  const router = useRouter();

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      await signUp(email, password);
      Alert.alert("Success", "Account created! Please log in.");
      router.push("/signin"); // Redirect to login page after successful signup
    } catch (error: any) {
      Alert.alert("Signup Failed", error.message || "An error occurred");
    }
  };

  return (
    <Template title="Sign Up">
      <TextInput
        placeholder="Email Address"
        style={styles.defaultInput}
        onChangeText={setEmail}
        value={email}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        style={styles.defaultInput}
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <TextInput
        placeholder="Confirm Password"
        style={styles.defaultInput}
        secureTextEntry
        onChangeText={setConfirmPassword}
        value={confirmPassword}
      />
      <ClimButton title="SIGN UP" color="blue" onClick={handleSignUp} />
    </Template>
  );
};

export default SignUp;
