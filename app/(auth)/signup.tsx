import { useState } from "react";
import { TextInput, Alert, ScrollView, View, Text } from "react-native";
import ClimButton from "../../components/ClimButton";
import Template from "../../components/Template";
import { styles } from "../../styles/styles";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "expo-router";
import { AuthError } from "@supabase/supabase-js";
import generateWeatherDisplayName from "../../utils/nameGenerator";
import { isComplexPassword, isValidEmail } from "../../utils/signupHelpers";

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const { signUp } = useAuth();
  const router = useRouter();

  const handleSignUp = async () => {
    if (!email) {
      Alert.alert("Invalid Email", "Please fill in your email address.");
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert("Invalid Email", `${email} is not a valid email`);
      return;
    }

    if (!password) {
      Alert.alert("Blank Password", "Password cannot be blank");
      return;
    }

    const complexity = isComplexPassword(password);
    if (!complexity.valid) {
      Alert.alert(
        "Weak Password",
        "Your password must meet the following requirements:\n\n• " +
          complexity.errors.join("\n• ")
      );
      return;
    }

    if (!confirmPassword) {
      Alert.alert("Error", "Password confirmation cannot be blank");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      await signUp(
        email,
        password,
        displayName === "" ? generateWeatherDisplayName() : displayName
      );
      Alert.alert(
        "Success",
        "Account created! Please check your email for confirmation.",
        [{ text: "OK", onPress: () => router.replace("/email-confirm") }]
      );
    } catch (error: unknown) {
      let errorMessage = "An error occurred during signup";

      if (error instanceof AuthError) {
        switch (error.message) {
          case "User already registered":
            errorMessage =
              "This email is already in use. Please use a different email.";
            break;
          case "Invalid login credentials":
            errorMessage = "Invalid email or password format.";
            break;
          default:
            if (error.message.includes("invalid")) {
              errorMessage = "Please enter a valid email address.";
            } else if (error.message.includes("password")) {
              errorMessage =
                "Password is too weak or invalid. Please try a stronger one.";
            } else {
              errorMessage =
                error.message || "Signup failed. Please try again.";
            }
        }
      } else {
        errorMessage = "An unexpected error occurred.";
      }

      Alert.alert("Signup Failed", errorMessage);
    }
  };

  return (
    <Template title="Sign Up" vCentered={true}>
      <ScrollView style={styles.scrView}>
        <View style={styles.staticView}>
          <View style={[styles.titleWrapper]}><Text style={[styles.title, styles.center]}>Sign Up to Climapp</Text></View>
      <TextInput
        placeholder="Display Name (optional)"
        style={styles.defaultInput}
        onChangeText={setDisplayName}
        value={displayName}
        autoCapitalize="words"
      />
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
        autoCapitalize="none"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <TextInput
        placeholder="Confirm Password"
        style={styles.defaultInput}
        autoCapitalize="none"
        secureTextEntry
        onChangeText={setConfirmPassword}
        value={confirmPassword}
      />
      <ClimButton title="SIGN UP" color="blue" onClick={handleSignUp} />
      </View>
      </ScrollView>
    </Template>
  );
};

export default SignUp;
