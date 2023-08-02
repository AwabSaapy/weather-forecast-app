import React from 'react';
import './App.scss';
import WeatherContainer from "./modules/weather/containers/weather/weather.container";

function App() {


  return (
    <div className="App">
        <h1> Weather Forecast </h1>
        <WeatherContainer />
    </div>
  );
}

export default App;
