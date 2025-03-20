import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

const TabLayout = () => {
  return (
    <Tabs>
      {/* Home Tab */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" color={color} size={15} />
          ),
        }}
      />

      {/* Search Tab */}
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
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

export default TabLayout;
