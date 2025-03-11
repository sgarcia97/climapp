import { Stack } from 'expo-router'

const Layout = () => {
    return(
        <Stack>
            <Stack.Screen 
            name="index"
            options={{
                title:'Sign up'
            }}
             />
        </Stack>
    )
}

export default Layout