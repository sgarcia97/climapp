import { TextInput, View, Text, TouchableHighlight, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import { useState, useEffect } from 'react'
import { styles } from '../styles/styles'
const Search = () => {
    const [search, setSearch] = useState<string>("")
    const [data, setData] = useState<any>(null)
    const router = useRouter()
        const searchWeather = async (location:string) => {
            if(location != ""){
            const response = await fetch("https://api.weatherapi.com/v1/search.json?key=1f571ab3d93c4dab9ac195429252603&q="+location)
            const results = await response.json()
            setData(results)
            }
        }
    
    const handleSearch = (s:string) => {
        setSearch(s)
        searchWeather(s)
    }
    return(
        <View style={styles.searchWrapper}>    
            <TextInput style={styles.searchInput} placeholder="Search for your city or country" onChangeText={text=>handleSearch(text)}/>
     
                <View style={styles.searchResultsWrapper}>
                {data && data.map((item:any,i:number)=>(
                    <TouchableOpacity key={i} onPress={()=>router.navigate(`details/${item.name}`)}><View style={styles.searchResult}><Text>{item.name}, {item.region}</Text></View></TouchableOpacity>
                ))}
                </View>
        </View>
    )
}

export default Search