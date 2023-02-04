import { Button, Typography } from '@mui/material';
import { useState } from 'react';
// import GetCurrentWeather from '../components/DashboardComponents/Weather/GetCurrentWeather';
// //import GetForecast from '../components/DashboardComponents/Weather/GetForecast';
// import { fetchForecast } from '../components/DashboardComponents/Weather/GetForecast';
import WeatherWidget from '../components/DashboardComponents/Weather/WeatherWidget';

export default function Test() {
  const [weatherwidget, setweatherwidget] = useState(false);

  return (
    <div>
      <Button onClick={() => setweatherwidget(!weatherwidget)}>
        click me to toggle the weather widget
      </Button>
      <Typography>
        later, users will be able to switch from imperial to the other one
      </Typography>
      {weatherwidget ? <WeatherWidget /> : <></>}
    </div>
  );
}
