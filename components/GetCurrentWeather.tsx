import { CurrentData } from '../utility/types/weather';

const GetCurrentWeather = async () => {

  const fetchCurrentWeather = async (zipcode: number): Promise<CurrentData> => {
    // TODO: conv zipcode to longitude/latitude, then add as parameter
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?zip=34787&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&cnt=3&units=imperial`
    );
    const data: CurrentData = await res.json();
    return data;
  };
  const currentWeather = await fetchCurrentWeather(34787);
  //console.log(currentWeather);
};

export default GetCurrentWeather;