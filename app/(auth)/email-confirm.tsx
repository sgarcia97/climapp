import React from "react";
import { Text, Button, ScrollView, View } from "react-native";
import { useRouter } from "expo-router";
import Template from "../../components/Template";
import ClimButton from "../../components/ClimButton";
import { styles, blue, pink } from "../../styles/styles";

const EmailConfirmation = () => {
  const router = useRouter();

  const handleResendConfirmation = () => {
    // Todo: actually resend email
    alert("Resending confirmation email...");
  };

  return (
    <Template title="Welcome to Climapp" vCentered={true}>
      <View style={styles.staticView}>
      <Text style={styles.emailResendMessage}>
        Please check your inbox for a confirmation link to complete your
        sign-up.
      </Text>
      <Text style={styles.emailResendSpam}>
        If you haven't received it, check your spam folder.
      </Text>
      <ClimButton
        title="Resend Confirmation Email"
        onClick={handleResendConfirmation}
        color={blue}
      />
      <ClimButton
        title="Back to Login"
        onClick={() => router.replace("/(auth)/login")}
      />
      </View>
    </Template>
  );
};

export default EmailConfirmation;
