import React from 'react';
import { CurrentData, ForecastData } from '../../../utility/types/weather';
import { fetchCurrentWeather } from './GetCurrentWeather';
import { fetchForecast } from './GetForecast';

interface Props {
  name:string,
  metric: string
}

const WeatherWidget: React.FC<Props> = ({ name, metric }) => {
  const [forecast, setForecast] = React.useState<ForecastData | null>(null);
  const [current, setCurrent] = React.useState<CurrentData | null>(null);

  React.useEffect(() => {
    async function fetchWeather() {
      const dataForecast = await fetchForecast(name, metric);
      const currentForecast = await fetchCurrentWeather(name, metric);
      setForecast(dataForecast);
      setCurrent(currentForecast);
    }
    fetchWeather();
  }, [name]);

  if (!forecast || !current) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>WOOOOOOOOOOOOOOOOOOOOOOOOOOO</p>
      <p>{current.name}</p>
    </div>
  );
};

export default WeatherWidget;
