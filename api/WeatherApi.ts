import { useState, useEffect } from "react"

const weatherApi = async () => {
    try{
        const response = await fetch("https://api.weatherapi.com/v1/forecast.json?key=1f571ab3d93c4dab9ac195429252603&q=auto:ip&days=3&aqi=yes&alerts=yes")
        const data = await response.json()
        return data
    }catch(error){
        console.error(error)
    }

}

export const weather = weatherApi()