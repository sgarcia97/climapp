import { Stack } from "expo-router";
import { lightblue, blue } from "../../styles/styles";
import { Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import moment from "moment";
const Layout = () => {
    const params = useLocalSearchParams<any>()
    return(
        <Stack> 
        <Stack.Screen name="[date]" options={{
            presentation:"transparentModal",
            headerTitle:'Weather for '+moment(params.date).format('ddd MMM M'),
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