import FontAwesome from "@expo/vector-icons/FontAwesome6";
import { Tabs, Stack } from "expo-router";
import { Text } from 'react-native'
import { blue, pink, lightblue, styles } from "../../styles/styles"
const grey = "#707070"
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
          tabBarIcon: ({ focused }) => (
            <FontAwesome name="house" color={focused ? blue : grey} size={18} />
          ),
          tabBarLabel: ({ focused,children }) => (
            <Text style={{fontSize:12, color: focused ? blue : grey, fontWeight: focused ? "bold" : "normal"}}>{children}</Text>
          )
        }}
      />

      {/* Search Tab */}
      <Tabs.Screen
        name="locations"
        options={{
          title: "My Locations",
          tabBarIcon: ({ focused }) => (
            <FontAwesome name="location-dot" color={focused ? blue : grey} size={18} />
          ),
          tabBarLabel: ({ focused,children }) => (
            <Text style={{fontSize:12, color: focused ? blue : grey, fontWeight: focused ? "bold" : "normal"}}>{children}</Text>
          )
        }}
      />

      {/* Newsfeed Tab (Newly Added) */}
      <Tabs.Screen
        name="newsfeed"
        options={{
          title: "Newsfeed",
          tabBarIcon: ({ focused }) => (
            <FontAwesome name="newspaper" color={focused ? blue : grey} size={18} />
          ),
          tabBarLabel: ({ focused,children }) => (
            <Text style={{fontSize:12, color: focused ? blue : grey, fontWeight: focused ? "bold" : "normal"}}>{children}</Text>
          )
        }}
      />

      {/* Profile Tab */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <FontAwesome name="user" color={focused ? blue : grey} size={18} />
          ),
          tabBarLabel: ({ focused,children }) => (
            <Text style={{fontSize:12, color: focused ? blue : grey, fontWeight: focused ? "bold" : "normal"}}>{children}</Text>
          )
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
