import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import {
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
  useMediaQuery
} from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { CurrentData, ForecastData } from '../../../utility/types/weather';


const WeatherWidget: React.FC = () => {
  const [editMode, setEditMode] = React.useState(false);
  const [city, setCity] = React.useState('Bohol, Philippines');
  const [metric, setMetric] = React.useState('imperial');
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const smallScreen = useMediaQuery('(maxWidth: 768px)');
  const [error, setError] = React.useState(false);
  const nodeRef = React.useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = React.useState(false);
  const [loading, sLoading] = React.useState(false);

  const handleDrag = (e: any, val: any) => {
    setPosition({ x: val.x, y: val.y });
  };

  const [weatherWidget, setWeatherWidget] = React.useState<{forecast?: ForecastData, current?: CurrentData}>({
    forecast: undefined,
    current: undefined
  })

  async function fetchForecast(
    name: string,
    metric: string
  ): Promise<ForecastData> {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${name}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=${metric}`
    );
    return await res.json();
  }

  async function fetchCurrentWeather(
    name: string,
    metric: string
  ): Promise<CurrentData> {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=${metric}`
    );
    return await res.json()
  }

  React.useEffect(() => {
    //toggleLoading();
    async function fetchWeather() {
      try {
        if (city === "") {
          setError(true);
          setEditMode(true);
        } else {
          sLoading(true)
          const forecastData = await fetchForecast(city, metric)
          const currentData = await fetchCurrentWeather(city, metric)
  
          if (forecastData === undefined || currentData === undefined || forecastData.cod === "404") {
            setError(true);
            setEditMode(true);
            
          } else {
            setEditMode(false);
            setError(false);

            setWeatherWidget({
              forecast: forecastData,
              current: currentData
            })
          }
        }
        sLoading(false);
      } catch (e) {
        console.log(e)
      }
      //toggleLoading();
    }
    fetchWeather();
  }, [city, metric]);

  if (weatherWidget.current === undefined || weatherWidget.forecast === undefined) {
    return (
          <CircularProgress color="inherit" />
    );
  }

  return (
    <div>
      {weatherWidget &&
      <div>
            {/* <Draggable position={position} onStop={handleDrag} disabled={smallScreen}> */}
            <Paper
            square={false}
            style={{
              display: 'inline-block',
              borderRadius: 5,
              backgroundColor: '#E1E2DE',
            }}
          >
            <Grid container direction="row" justifyContent="flex-end">
              {editMode ? (
                <IconButton
                  onClick={() => setEditMode(false)}
                  style={$iconButtonStyle}
                >
                  <CancelIcon style={$iconStyle} />
                </IconButton>
              ) : (
                <IconButton
                  onClick={() => setEditMode(true)}
                  style={$iconButtonStyle}
                >
                  <EditIcon style={$iconStyle} />
                </IconButton>
              )}
            </Grid>
            <Divider orientation="horizontal" />
            <Grid container direction="row" justifyContent="space-around">
              <Stack
                direction={'row'}
                justifyContent={'space-around'}
                divider={
                  <Divider orientation="vertical" flexItem variant="middle" />
                }
              >
                <Stack
                  justifyContent={'center'}
                  alignItems={'center'}
                  margin={1}
                  marginRight={3}
                >
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
                <Stack
                  justifyContent={'center'}
                  alignItems={'center'}
                  margin={1}
                  marginLeft={3}
                >
                  {editMode ? (
                    <TextField
                      error={error}
                      disabled={loading}
                      helperText={error ? 'city not found' : ''}
                      id="city_name"
                      label={loading ? <CircularProgress /> : "enter a city"}
                      variant="standard"
                      onBlur={(e) => setCity(e.target.value)}
                    />
                  ) : (
                    <Typography variant="h4">{weatherWidget.current.name}</Typography>
                  )}
                  <Typography variant="h6">{weatherWidget.current.main.temp}°F</Typography>
  
                  <Typography
                    variant="caption"
                    noWrap={true}
                    style={{ marginTop: 15 }}
                  >
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
              direction={'row'}
              justifyContent="space-around"
              divider={
                <Divider orientation="vertical" flexItem variant="middle" />
              }
            >
              {/* TODO: Currently, the weather forecast is grabbed during different times (the api gives us 3 hour forecasts but it's difficult to grab all the noon forecasts etc.)*/}
              {weatherWidget.forecast.list
                .filter((_:any, i:any) => i % 9 === 0)
                .map((data:any, idx:any) => (
                  <Stack
                    key={idx}
                    justifyContent={'center'}
                    alignItems={'center'}
                    margin={1}
                  >
                    <Typography>
                      {new Date(data.dt * 1000).toLocaleDateString('en-US', {
                        weekday: 'short',
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
        {/* </Draggable> */}
        </div>
      }
    </div>
  );
};

const $iconStyle: React.CSSProperties = {
  width: 20,
  height: 20,
};

const $iconButtonStyle: React.CSSProperties = {
  width: 25,
  height: 25,
};
export default WeatherWidget;
