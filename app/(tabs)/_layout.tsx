import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from "expo-router"

const TabLayout = () => {
    return(
    <Tabs>
        <Tabs.Screen
            name="index"
            options={{
                title: 'Home',
                tabBarIcon: ({color}) => 
                    <FontAwesome name="home" color={color} size={15}/>
                
            }}
        />
        <Tabs.Screen
            name="search"
            options={{
                title: 'Search',
                tabBarIcon: ({color}) => 
                    <FontAwesome name="search" color={color} size={15}/>
                
            }}
        />
        <Tabs.Screen
            name="profile"
            options={{
                title: 'Profile',
                tabBarIcon: ({color}) => 
                    <FontAwesome name="user" color={color} size={15}/>
                
            }}
        />
    </Tabs>
    )
}

export default TabLayout;