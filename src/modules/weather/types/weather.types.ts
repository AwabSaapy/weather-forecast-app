import {ICity} from "../../city/types/city.types";

export type IWeather = {
    id: number;
    dt: number;
    name: string;
    main:IWeatherMain;
    wind: IWeatherWind;
    weather: IWeatherStatus[];
}

export type IWeatherMain = {
    feels_like: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp: number;
    temp_max: number;
    temp_min: number;
}

export type IWeatherWind = {
    deg: number;
    gust: number;
    speed: number;
}

export type IWeatherStatus = {
    id: number;
    description: string;
    icon: string;
    main: string;
}

export type IForecastWeather = {
    city: ICity;
    list: IForecastWeatherList[];
}

export type IForecastWeatherList = {
    dt: number;
    main: IWeatherMain;
    weather: IWeatherStatus[];
    wind: IWeatherWind;
}

export type CustomError = {
    code: string;
    message: string;
}
