import { Stack } from "expo-router";
import { lightblue } from "../../styles/styles";
const Layout = () => {
    return(
        <Stack> 
        <Stack.Screen name="[location]" options={{
            presentation:"modal",
            headerTitle:"Location",
            headerStyle:{
                backgroundColor:lightblue
            }
        }}/>
        </Stack>
    )
}

export default Layout