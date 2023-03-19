interface Main {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  humidity: number
}

interface Weather {
  id: number
  main: string
  description: string
  icon: string
}

interface City {
  id: number
  name: string
  coord: {
    lat: number
    lon: number
  }
  country: string
}

export interface Forecast {
  dt: number
  main: Main
  weather: Weather[]
  dt_txt: string
  cod: string
  cnt: number
  list: Forecast[]
  city: City
}

export interface ForecastData {
  cod: string
  cnt: number
  list: Forecast[]
  city: City
}

export interface CurrentData {
  cod: string
  weather: Weather[]
  main: Main
  name: string
}
