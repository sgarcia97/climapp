import { Stack } from "expo-router";
import { lightblue, blue } from "../../styles/styles";
const Layout = () => {
    return(
        <Stack> 
        <Stack.Screen name="[date]" options={{
            presentation:"transparentModal",
            headerTitle:"Day Information",
            headerStyle:{
                backgroundColor:blue
            },
            headerTitleStyle:{
                color:"#fff"
            }
        }}/>
        </Stack>
    )
}

export default Layout