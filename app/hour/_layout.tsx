import { Stack } from "expo-router";
import { blue } from "../../styles/styles";
import { useLocalSearchParams } from "expo-router";
import moment from "moment";
const Layout = () => {
    const params = useLocalSearchParams<any>()
    return(
        <Stack> 
        <Stack.Screen name="[time]" options={{
            presentation:"transparentModal",
                       headerTitle:"Weather for "+moment(params.time).format('h:mm A'),
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