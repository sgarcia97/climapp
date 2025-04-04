import React from "react";
import { Text, Button, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import Template from "../../components/Template";
import ClimButton from "../../components/ClimButton";
import { styles } from "../../styles/styles";

const EmailConfirmation = () => {
  const router = useRouter();

  const handleResendConfirmation = () => {
    // Todo: actually resend email
    alert("Resending confirmation email...");
  };

  return (
    <Template title="Welcome to Climapp" vCentered={true}>
      <ScrollView style={styles.scrView}>
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
      />
      <ClimButton
        title="Back to Login"
        onClick={() => router.replace("/(auth)/login")}
      />
      </ScrollView>
    </Template>
  );
};

export default EmailConfirmation;
