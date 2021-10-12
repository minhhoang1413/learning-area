import React, { useState, useEffect } from "react";
import WeatherInfo from "./WeatherInfo";
const Weather = ({ country }) => {
    const [weather, setWeather] = useState();
    const api_key = process.env.REACT_APP_API_KEY;

    useEffect(() => {
        fetch(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital[0]}&units=m`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setWeather(data.current)
            })
            .catch(err => console.log(err))
    }, [])
    if (weather) {
        return (
            <WeatherInfo country={country} weather={weather} />
        )
    }
    return <p>........</p>
}
export default Weather