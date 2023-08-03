import React, {FC, useEffect, useState} from "react";
import {Alert, Snackbar} from "@mui/material";
import {ICity} from "../../../city/types/city.types";
import CitySelect, {ICitySelectEvent} from "../../../city/components/city-select/city-select.componet";
import {WEATHER_API_KEY, WEATHER_API_URL} from "../../apis/weather.api";
import {IForecastWeather, IWeather} from "../../types/weather.types";
import CurrentWeather from "../../components/current-weather/current-weather.component";
import ForecastWeather from "../../components/forecast-weather/forecast-weather.component";
import Spinner from "../../../main/components/spinner/spinner.component";
import './weather.container.scss';

class CustomError extends Error {
    constructor(public code: number, message: string) {
        super(message);
    }
}

type WeatherContainerProps = {

}

const WeatherContainer: FC<WeatherContainerProps> = () => {

    const [city, citySet] = useState<ICity | undefined | null>();
    const [currentWeather, currentWeatherSet] = useState<IWeather>();
    const [forecastWeather, forecastWeatherSet] = useState<IForecastWeather>();
    const [loading, loadingSet] = useState<boolean>(false);
    const [errorSnackbar, errorSnackbarSet] = useState<string>("");

    const onCitySelectChange = (event: ICitySelectEvent) => {
        if (event.type === "SELECTED") {
            citySet(event.payload.city);
            currentWeatherSet(undefined);
            forecastWeatherSet(undefined);
        }
    }

    const checkErrorExist = (code: string, message: string) => {
        if (!code || !message) return;

        const codeError = parseInt(code);
        if (codeError >= 400 && codeError <= 499) {
            throw new CustomError(codeError, message);
        }
    }

    const getCurrentWeatherData = (city: ICity) => {
        const { latitude, longitude } = city;

        (async () => {
            try {
                loadingSet(true);

                const response = await fetch(`${WEATHER_API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`);
                const result = await response.json();
                loadingSet(false);

                checkErrorExist(result.cod, result.message);

                currentWeatherSet(result);
            } catch (error) {
                if (error instanceof CustomError) {
                    errorSnackbarSet(error.message);
                }
                console.error(error);
                loadingSet(false);
            }
        })();
    }

    const getForecastWeatherData = (city: ICity) => {
        const { latitude, longitude } = city;

        (async () => {
            try {
                loadingSet(true);
                const response = await fetch(`${WEATHER_API_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`);
                const result = await response.json();

                loadingSet(false);

                checkErrorExist(result.cod, result.message);

                forecastWeatherSet(result);
            } catch (error) {
                if (error instanceof CustomError) {
                    errorSnackbarSet(error.message);
                }
                console.error(error);
                loadingSet(false);
            }
        })();
    }

    useEffect(() => {
        if (city) {
            getCurrentWeatherData(city);
            getForecastWeatherData(city);
        }
    }, [city]);

    return (
        <div className="weather-container">
            <CitySelect value={city} onChange={onCitySelectChange} />

            {
                (loading) && <Spinner />
            }

            {
                (!loading && city && currentWeather) && <CurrentWeather city={city} currentWeather={currentWeather} />
            }

            {
                (!loading && forecastWeather) && <ForecastWeather forecastWeather={forecastWeather} />
            }

            <Snackbar open={!!errorSnackbar} autoHideDuration={3000} anchorOrigin={{ vertical: 'top', horizontal: 'center'}} onClose={() => errorSnackbarSet("")}>
                <Alert onClose={() => errorSnackbarSet("")} severity="error" sx={{ width: '100%' }}>
                    {errorSnackbar}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default WeatherContainer;
