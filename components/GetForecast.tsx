import { ForecastData } from '../utility/types/weather';

const GetForecast = async () => {

  const fetchForecast = async (zipcode: number): Promise<ForecastData> => {
    // TODO: conv zipcode to longitude/latitude, then add as parameter
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?zip=34787&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&cnt=3&units=imperial`
    );
    const data: ForecastData = await res.json();
    return data;
  };
  const forecast = await fetchForecast(34787);
  //console.log(forecast);
};

export default GetForecast;
