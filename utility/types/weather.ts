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
  dt_txt: string;
}

export interface ForecastData {
  cod: number;
  cnt: number;
  list: Forecast[];
  city: City;
}

export interface CurrentData {
  weather: Weather;
  main: Main;
  name: string;
}
