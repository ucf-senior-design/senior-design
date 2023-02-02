// TODO: Move weather.ts under widgets folder once merged in

export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Clouds {
  all: number;
}

export interface City {
  id: number;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  country: string;
}

export interface Forecast {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  dt_txt: string;
}

export interface ForecastData {
  cod: number;
  cnt: number;
  list: Forecast[];
  city: City;
}

export interface CurrentWeather {
  weather: Weather;
  main: Main;
  name: string;
}



// export const fetchCurrentWeather = async (zipcode:number): Promise<ForecastData> => {
//     const API_KEY = process.env.WEATHER_API_KEY;
//     //const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${zipcode}&aqi=yes`)
//     const res = await fetch('https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=${API_KEY}&cnt=5')
//     const data: ForecastData = await res.json()
//     return data
// };
