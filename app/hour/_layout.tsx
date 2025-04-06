import { Stack } from "expo-router";
import { blue } from "../../styles/styles";
const Layout = () => {
    return(
        <Stack> 
        <Stack.Screen name="[time]" options={{
            presentation:"transparentModal",
                       headerTitle:"Time Information",
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