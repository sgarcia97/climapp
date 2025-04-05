import { Stack } from "expo-router";
import { lightblue } from "../../styles/styles";
const Layout = () => {
    return(
        <Stack> 
        <Stack.Screen name="[date]" options={{
            presentation:"transparentModal",
            headerTitle:"Day Information",
            headerStyle:{
                backgroundColor:lightblue
            }
        }}/>
        </Stack>
    )
}

export default Layout