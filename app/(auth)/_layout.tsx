import { Stack, Redirect } from "expo-router";
import { useAuth } from "../../contexts/AuthContext";
import { blue } from "../../styles/styles"

export default function AuthLayout() {
  const { session, isGuest } = useAuth();

  // if logged in or guest redirect to tabs/home
  if (session || isGuest) {
    return <Redirect href="/(tabs)/home" />;
  }

  return (
    <Stack >
      <Stack.Screen name="login" options={{
        headerShown:false,
        headerTitle:"Login"
      }}/>
      <Stack.Screen name="signup" options={{ 
        title: "Sign Up", 
        headerStyle:{
          backgroundColor:blue,
          
        },
        headerTitleStyle:{
          color:"#fff"
        }
        }} />
      <Stack.Screen
        name="email-confirm"
        options={{ title: "Sign up Successful" }}
      />
    </Stack>
  );
}
