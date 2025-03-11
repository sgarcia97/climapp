import { Stack } from "expo-router";

const Layout = () => {
    return(
    <Stack>
        <Stack.Screen name="index" options={{ headerShown: false}}/>
        <Stack.Screen name="(tabs)" options={{ headerShown: false}}/>
        <Stack.Screen name="signin" options={{ 
            title:'Sign in'
        }}/>
        <Stack.Screen name="signup" options={{ 
            title:'Sign up'
        }}/>
    </Stack>
    )
}

export default Layout