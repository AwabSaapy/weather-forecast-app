import React, { FC } from "react";
import { WEEK_DAYS } from "../../constants/weather.constants";
import { IForecastWeather } from "../../types/weather.types";
import './forecast-weather.component.scss';
import {isDevelopment} from "../../../main/others/others.utils";

type ForecastWeatherProps = {
    forecastWeather: IForecastWeather;
}

const ForecastWeather: FC<ForecastWeatherProps> = (props) => {

    const {
        forecastWeather,
    } = props;

    const dayInWeek = new Date().getDay();
    const forecastDays = WEEK_DAYS.slice(dayInWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInWeek));

    return (
        <div className="forecast-weather-component">
            {
                forecastWeather.list.splice(0, 5).map((item, index) => {
                    const [ weather ] = item.weather;

                    return (
                        <div className="card" key={item.dt}>
                            <div className="card-header"> {forecastDays[index]} </div>
                            <div className="card-content">
                                <div className="weather-info">
                                    <div className="weather-temperature">
                                        <span> {Math.round(item.main.temp)} </span>
                                        <span className="celsius-symbol"> °C </span>
                                    </div>

                                    <img className="weather-image" alt={weather.description} src={`${isDevelopment ? 'weather-forecast-app/' : ''}assets/${weather.icon}.png`} />
                                </div>

                                <div className="weather-description"> {weather.description} </div>

                                <div className="weather-attribute-wrapper">
                                    <span className="weather-attribute-name"> Humidity: </span>
                                    <span className="weather-attribute-value"> {item.main.humidity}% </span>
                                </div>

                                <div className="weather-attribute-wrapper">
                                    <span className="weather-attribute-name"> Pressure: </span>
                                    <span className="weather-attribute-value"> {item.main.pressure} hPa </span>
                                </div>

                                <div className="weather-attribute-wrapper">
                                    <span className="weather-attribute-name"> Wind: </span>
                                    <span className="weather-attribute-value"> {item.wind.speed} m/s </span>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ForecastWeather;
