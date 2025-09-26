import React, { useEffect, useState } from 'react';
import './Weather.css';
import searchIcon from '../assets/search.png';
import clearIcon from '../assets/clear.png';
import windIcon from '../assets/wind.png';
import humidityIcon from '../assets/humidity.png';

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [input, setInput] = useState("");

    const allIcons = {
        "01d": clearIcon,
        "01n": clearIcon,
        "02d": clearIcon,
        "02n": clearIcon,
        "03d": clearIcon,
        "03n": clearIcon,
        "04d": clearIcon,
        "04n": clearIcon,
        "09d": clearIcon,
        "09n": clearIcon,
        "10d": clearIcon,
        "10n": clearIcon,
        "11d": clearIcon,
        "11n": clearIcon,
        "13d": clearIcon,
        "13n": clearIcon,
        "50d": clearIcon,
        "50n": clearIcon,
    };

    const search = async (city) => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const response = await fetch(url);
            const data = await response.json();
            if (data.cod === 200) {
                const icon = allIcons[data.weather[0].icon] || clearIcon;
                setWeatherData({
                    humidity: data.main.humidity,
                    wind: data.wind.speed,
                    city: data.name,
                    temperature: Math.floor(data.main.temp),
                    icon: icon
                });
            } else {
                alert("City not found!");
            }
        } catch(error) {
            console.error("Error fetching weather data:", error);
        }   
    }

    useEffect(() => {
        search("London");
    }, []);

    const handleSearch = () => {
        if(input.trim() !== "") search(input.trim());
        setInput("");
    }

    const handleKeyDown = (e) => {
        if(e.key === "Enter") handleSearch();
    }

    return (
        <div className='weather'>
            <div className="search-bar">
                <input 
                    type="text" 
                    placeholder='Search city...' 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <img src={searchIcon} alt="Search" onClick={handleSearch} />
            </div>

            {weatherData && (
                <>
                    <div className="weather-main">
                        <img src={weatherData.icon} alt="Weather Icon" className='weather-icon'/>
                        <div className="temp-location">
                            <p className='temperature'>{weatherData.temperature}°C</p>
                            <p className='location'>{weatherData.city}</p>
                        </div>
                    </div>

                    <div className="weather-data">
                        <div className="col">
                            <img src={humidityIcon} alt="Humidity" />
                            <div>
                                <p>{weatherData.humidity}%</p>
                                <span>Humidity</span>
                            </div>
                        </div>
                        <div className="col">
                            <img src={windIcon} alt="Wind" />
                            <div>
                                <p>{weatherData.wind} km/h</p>
                                <span>Wind Speed</span>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Weather;
