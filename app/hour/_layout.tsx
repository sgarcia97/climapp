import { Stack } from "expo-router";
import { lightblue } from "../../styles/styles";
const Layout = () => {
    return(
        <Stack> 
        <Stack.Screen name="[time]" options={{
            presentation:"transparentModal",
            headerTitle:"Time Information",
            headerStyle:{
                backgroundColor:lightblue
            }
        }}/>
        </Stack>
    )
}

export default Layout