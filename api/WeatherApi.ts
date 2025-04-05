import { useState, useEffect } from "react"
import moment from 'moment'

export const weatherApi = async (location:string='auto:ip') => {
    try{
        const response = await fetch("https://api.weatherapi.com/v1/forecast.json?key=1f571ab3d93c4dab9ac195429252603&q="+location+"&days=7&aqi=yes&alerts=yes")
        const data = await response.json()
        return data
    }catch(error){
        console.error(error)
    }

}

export const astronomyApi = async (location:string) => {
    try{
        const response = await fetch("https://api.weatherapi.com/v1/astronomy.json?key=1f571ab3d93c4dab9ac195429252603&q="+location+"&dt="+moment().format('YYYY-MM-DD'))
        const data = await response.json()
        return data
    }catch(error){
        console.error(error)
    }

}

export const marineApi = async (location:string) => {
    try{
        const response = await fetch("https://api.weatherapi.com/v1/marine.json?key=1f571ab3d93c4dab9ac195429252603&days=1&q="+location)
        const data = await response.json()
        return data
    }catch(error){
        console.error(error)
    }

}


