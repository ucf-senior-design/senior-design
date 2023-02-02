import { fetchForecast } from "../utility/weather";

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
    const forecast = await fetchForecast(34787)
    console.log(forecast)
}

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