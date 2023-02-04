import { ForecastData } from '../../../utility/types/weather';

export async function fetchForecast(
  name: string,
  metric: string
): Promise<ForecastData> {
  // TODO: conv zipcode to longitude/latitude, then add as parameter
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${name}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=${metric}`
  );
  const data: ForecastData = await res.json();
  return data;
}
