import { CurrentData } from '../../../utility/types/weather';

export async function fetchCurrentWeather(
  name: string,
  metric: string
): Promise<CurrentData> {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=${metric}`
  );
  const data: CurrentData = await res.json();
  return data;
}
