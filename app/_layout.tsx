import { Stack } from "expo-router";
import { AuthProvider } from "../contexts/AuthContext";

const Layout = () => {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="signin"
          options={{
            title: "Sign in",
          }}
        />
        <Stack.Screen
          name="signup"
          options={{
            title: "Sign up",
          }}
        />
      </Stack>
    </AuthProvider>
  );
};

export default Layout;
