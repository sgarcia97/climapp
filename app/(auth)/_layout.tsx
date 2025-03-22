import { Stack, Redirect } from "expo-router";
import { useAuth } from "../../contexts/AuthContext";

export default function AuthLayout() {
  const { session, isGuest } = useAuth();

  // if logged in or guest redirect to tabs/home
  if (session || isGuest) {
    return <Redirect href="/(tabs)/home" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" options={{ title: "Sign Up" }} />
      <Stack.Screen
        name="email-confirm"
        options={{ title: "Sign up Successful" }}
      />
    </Stack>
  );
}
