import { useState, useEffect } from "react"
import moment from 'moment'

const weatherApi = async () => {
    try{
        const response = await fetch("https://api.weatherapi.com/v1/forecast.json?key=1f571ab3d93c4dab9ac195429252603&q=auto:ip&days=3&aqi=yes&alerts=yes")
        const data = await response.json()
        return data
    }catch(error){
        console.error(error)
    }

}

const astronomyApi = async () => {
    try{
        const response = await fetch("https://api.weatherapi.com/v1/astronomy.json?key=1f571ab3d93c4dab9ac195429252603&q=Calgary&dt="+moment().format('YYYY-MM-DD'))
        const data = await response.json()
        return data
    }catch(error){
        console.error(error)
    }

}



export const weather = weatherApi()
export const astro = astronomyApi()