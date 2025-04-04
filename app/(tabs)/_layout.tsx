import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs, Stack } from "expo-router";
import { blue, pink } from "../../styles/styles"
const TabLayout = () => {
  return (

    <Tabs screenOptions={{
      tabBarStyle:{
        backgroundColor:"#CEE1F2"
      },
      headerStyle:{
        backgroundColor:blue
      },
      headerTitleStyle:{
        color:"#fff"
      },
      
    }}>
      {/* Home Tab */}
      <Tabs.Screen
        name="home"
        options={{
          
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" color={color} size={15} />
          ),
        }}
      />

      {/* Search Tab */}
      <Tabs.Screen
        name="locations"
        options={{
          title: "My Locations",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="search" color={color} size={15} />
          ),
        }}
      />

      {/* Newsfeed Tab (Newly Added) */}
      <Tabs.Screen
        name="newsfeed"
        options={{
          title: "Newsfeed",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="newspaper-o" color={color} size={15} />
          ),
        }}
      />

      {/* Profile Tab */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" color={color} size={15} />
          ),
        }}
      />
    </Tabs>
  );
};
/*
export const StackLayout = () => {
  return(
    <Stack>
       <Stack.Screen name="details"></Stack.Screen>
    </Stack>
  )
}
*/
export default TabLayout;
