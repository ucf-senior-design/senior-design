import { ForecastData } from '../utility/types/weather';

const GetForecast = async () => {
  // const [weather, setWeather] = useState<ForecastData>({
  //     cnt: 0,
  //     list: [],
  //     city:
  // })
  // const [zip, setZip] = useState(34787)

  // useEffect(() => {
  //     fetchWeather(34787)
  //     .then(data => {
  //         console.log(data)
  //     })
  //     .catch(error => {
  //         console.error(error)
  //     })
  // }, []);

  // return (

  // )

  const fetchForecast = async (zipcode: number): Promise<ForecastData> => {
    // TODO: conv zipcode to longitude/latitude, then add as parameter
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=28.33&lon=-81.35&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&cnt=3&units=imperial`
    );
    const data: ForecastData = await res.json();
    return data;
  };
  const forecast = await fetchForecast(34787);
  console.log(forecast);
};

export default GetForecast;
// export function GetWeather({
//     purpose,
// }: {
//     purpose: 'current' | 'forecast';
// }) {

//     async function handleWeather() {
//         if (purpose === 'current') {
//             const currentWeather = await fetchCurrentWeather(34787)
//             console.log(currentWeather)
//         }
//         if (purpose === 'forecast') {
//             const forecast = await fetchForecast(34787)
//             console.log(forecast)
//         }
//     }
// }
