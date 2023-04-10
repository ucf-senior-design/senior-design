import { CircularProgress, Divider, Grid, Paper, Stack, TextField, Typography } from "@mui/material"
import Image from "next/image"
import React from "react"
import { useTrip } from "../../../utility/hooks/trip"
import { CurrentData, ForecastData } from "../../../utility/types/weather"

const WeatherWidget: React.FC = () => {
  const { trip } = useTrip()
  const [city, setCity] = React.useState(trip.destination)
  const [metric, setMetric] = React.useState("imperial")
  const [loading, sLoading] = React.useState(false)

  const [weatherWidget, setWeatherWidget] = React.useState<{
    forecast?: ForecastData
    current?: CurrentData
  }>({
    forecast: undefined,
    current: undefined,
  })

  const [state, setState] = React.useState({
    isError: false,
    inEditMode: false,
  })

  async function fetchForecast(name: string, metric: string): Promise<ForecastData> {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${name}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=${metric}`,
    )
    return await res.json()
  }

  async function fetchCurrentWeather(name: string, metric: string): Promise<CurrentData> {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=${metric}`,
    )
    return await res.json()
  }

  React.useEffect(() => {
    async function fetchWeather() {
      try {
        if (city === "") {
          setState((val) => ({
            ...val,
            inEditMode: true,
          }))
        } else {
          sLoading(true)
          const forecastData = await fetchForecast(city, metric)
          const currentData = await fetchCurrentWeather(city, metric)
          if (
            forecastData === undefined ||
            currentData === undefined ||
            forecastData.cod === "404"
          ) {
            setState({
              isError: true,
              inEditMode: true,
            })
          } else {
            setState({
              isError: false,
              inEditMode: false,
            })

            setWeatherWidget({
              forecast: forecastData,
              current: currentData,
            })
          }
        }
        sLoading(false)
      } catch (e) {
        console.log(e)
      }
    }
    fetchWeather()
  }, [city, metric])

  return (
    <div style={{ width: "100%", height: "300px", padding: "10px" }}>
      {weatherWidget && weatherWidget.current && weatherWidget.forecast && (
        <div>
          <Paper
            square={false}
            style={{
              display: "inline-block",
              borderRadius: 5,
              width: "100%",
              backgroundColor: "#white",
            }}
          >
            <Grid container direction="row" justifyContent="flex-end">
              {/* TODO: Temporarily removing editing */}
              {/* {state.inEditMode ? (
                <IconButton
                  onClick={() =>
                    setState((val) => ({
                      ...val,
                      inEditMode: false,
                    }))
                  }
                  style={$iconButtonStyle}
                >
                  <CancelIcon style={$iconStyle} />
                </IconButton>
              ) : (
                <IconButton
                  onClick={() =>
                    setState((val) => ({
                      ...val,
                      inEditMode: true,
                    }))
                  }
                  style={$iconButtonStyle}
                >
                  <EditIcon style={$iconStyle} />
                </IconButton>
              )} */}
            </Grid>
            <Divider orientation="horizontal" />
            <Grid container direction="row" justifyContent="space-evenly">
              <Stack
                direction={"row"}
                justifyContent={"center"}
                alignItems={"center"}
                margin={1}
                spacing={2}
                divider={<Divider orientation="vertical" flexItem variant="middle" />}
              >
                <Stack justifyContent={"center"} alignItems={"center"} margin={1}>
                  <Image
                    src={`http://openweathermap.org/img/wn/${weatherWidget.current.weather[0].icon}@2x.png`}
                    alt={weatherWidget.current.weather[0].main}
                    width={100}
                    height={100}
                  />
                  <Typography variant="subtitle1">
                    {weatherWidget.current.weather[0].description}
                  </Typography>
                </Stack>
                <Stack justifyContent={"center"} alignItems={"center"} margin={1} padding={1}>
                  {/* TODO: Grab the location from trip info as a default parameter instead */}
                  {state.inEditMode ? (
                    <TextField
                      error={state.isError}
                      disabled={loading}
                      helperText={state.isError ? "city not found" : ""}
                      id="city_name"
                      label={loading ? "loading..." : "enter a city"}
                      variant="standard"
                      onBlur={(e) => setCity(e.target.value)}
                    />
                  ) : (
                    <Typography variant="h4">{weatherWidget.current.name}</Typography>
                  )}
                  <Typography variant="h6">{weatherWidget.current.main.temp}°F</Typography>

                  <Typography variant="caption" noWrap={true} style={{ marginTop: 15 }}>
                    feels like {weatherWidget.current.main.feels_like}°F
                  </Typography>
                  <Typography variant="caption" noWrap={true}>
                    {weatherWidget.current.main.humidity}% humidity
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
            <Divider orientation="horizontal" variant="middle" />
            <Stack
              direction={"row"}
              justifyContent="space-around"
              divider={<Divider orientation="vertical" flexItem variant="middle" />}
            >
              {/* TODO: Currently, the weather forecast is grabbed during different times (the api gives us 3 hour forecasts but it's difficult to grab all the noon forecasts etc.)*/}
              {weatherWidget.forecast.list
                .filter((data: any) => {
                  const today = new Date()
                  today.setHours(0, 0, 0, 0)
                  const current = new Date(data.dt * 1000)
                  current.setHours(0, 0, 0, 0)
                  return current.getTime() !== today.getTime()
                })
                .filter((_: any, i: any) => i % 8 === 0)
                .map((data: any, idx: any) => (
                  <Stack key={idx} justifyContent={"center"} alignItems={"center"} margin={1}>
                    <Typography>
                      {new Date(data.dt * 1000).toLocaleDateString("en-US", {
                        weekday: "short",
                      })}
                    </Typography>
                    <Image
                      src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                      alt={data.weather[0].main}
                      width={50}
                      height={50}
                    />
                    <Typography variant="caption">{data.main.temp}°F</Typography>
                  </Stack>
                ))}
            </Stack>
          </Paper>
        </div>
      )}
    </div>
  )
}

const $iconStyle: React.CSSProperties = {
  width: 20,
  height: 20,
}

const $iconButtonStyle: React.CSSProperties = {
  width: 25,
  height: 25,
}

export default WeatherWidget
