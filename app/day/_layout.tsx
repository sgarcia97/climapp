import { Stack } from "expo-router";
import { lightblue, blue } from "../../styles/styles";
import { Image } from "react-native";
const Layout = () => {
    return(
        <Stack> 
        <Stack.Screen name="[date]" options={{
            presentation:"transparentModal",
            headerTitle:"Day Information",
            headerStyle:{
                backgroundColor:blue
            },
            headerBackVisible:true,
            headerTintColor:"#fff"
        }}/>
        </Stack>
    )
}

export default Layout