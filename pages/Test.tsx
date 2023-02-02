import { Button } from '@mui/material';
import { useState } from 'react';
// import GetCurrentWeather from '../components/DashboardComponents/Weather/GetCurrentWeather';
// //import GetForecast from '../components/DashboardComponents/Weather/GetForecast';
// import { fetchForecast } from '../components/DashboardComponents/Weather/GetForecast';
import WeatherWidget from '../components/DashboardComponents/Weather/WeatherWidget';

export default function Test() {
  const [weatherwidget, setweatherwidget] = useState(false);
  return (
    // <div>
    //   <Button onClick={async () => await fetchForecast(34787)}>
    //     click 4 weather forecast :]
    //   </Button>
    //   <Button onClick={async () => await GetCurrentWeather()}>
    //     click 4 current weather!!!! :]
    //   </Button>
    // </div>
    <div>
      <Button onClick={() => setweatherwidget(!weatherwidget)}>
        click me to toggle the weather widget
      </Button>
      {weatherwidget ? <WeatherWidget name='bohol, philippines' metric='imperial' /> : <></>}
    </div>
  );
}
