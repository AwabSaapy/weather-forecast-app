import React, { FC } from "react";
import { IWeather } from "../../types/weather.types";
import { ICity } from "../../../city/types/city.types";
import './current-weather.component.scss';

type CurrentWeatherProps = {
    city: ICity;
    currentWeather: IWeather;
}

const CurrentWeather: FC<CurrentWeatherProps> = (props) => {

    const {
        city,
        currentWeather,
    } = props;

    const [ weather ] = currentWeather.weather;

    return (
        <div className="current-weather-component">
            <div className="card">
                <div className="card-header"> Today </div>
                <div className="card-content">
                    <div className="weather-info">
                        <div className="weather-city-wrapper">
                            <div className="weather-city"> {city.name} </div>
                            <div className="weather-country"> {city.country} </div>
                        </div>

                        <div className="weather-image-wrapper">
                            <img className="weather-image" alt={weather.description} src={`assets/${weather.icon}.png`} />
                            <div className="weather-description"> {weather.description} </div>
                        </div>
                    </div>
                    <div className="weather-attributes-wrapper">
                        <div className="weather-temperature"> {Math.round(currentWeather.main.temp)}°C </div>

                        <div className="weather-other-attributes">
                            <div className="weather-attribute-wrapper">
                                <div className="weather-attribute-name"> Humidity: </div>
                                <div className="weather-attribute-value"> {currentWeather.main.humidity}% </div>
                            </div>

                            <div className="weather-attribute-wrapper">
                                <div className="weather-attribute-name"> Pressure: </div>
                                <div className="weather-attribute-value"> {currentWeather.main.pressure} hPa </div>
                            </div>

                            <div className="weather-attribute-wrapper">
                                <div className="weather-attribute-name"> Wind: </div>
                                <div className="weather-attribute-value"> {currentWeather.wind.speed} m/s </div>
                            </div>

                            <div className="weather-attribute-wrapper">
                                <div className="weather-attribute-name"> Min Temp: </div>
                                <div className="weather-attribute-value"> {Math.round(currentWeather.main.temp_min)}°C </div>
                            </div>

                            <div className="weather-attribute-wrapper">
                                <div className="weather-attribute-name"> Max Temp: </div>
                                <div className="weather-attribute-value"> {Math.round(currentWeather.main.temp_max)}°C </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CurrentWeather;
