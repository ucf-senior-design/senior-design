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
//import { useScreen } from '../../../utility/hooks/screen';
import { CurrentData, Forecast } from '../../../utility/types/weather';
import { fetchCurrentWeather } from './GetCurrentWeather';
import { fetchForecast } from './GetForecast';

const WeatherWidget: React.FC = () => {
  const [forecast, setForecast] = React.useState<Forecast[] | null>(null);
  const [current, setCurrent] = React.useState<CurrentData | null>(null);
  const [editMode, setEditMode] = React.useState(false);
  const [city, setCity] = React.useState('Bohol, Philippines');
  const [metric, setMetric] = React.useState('imperial');
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const smallScreen = useMediaQuery('(maxWidth: 768px)');
  const [error, setError] = React.useState(false);
  const nodeRef = React.useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = React.useState(false);
  //const {loading, toggleLoading} = useScreen();

  const handleDrag = (e: any, val: any) => {
    setPosition({ x: val.x, y: val.y });
  };

  React.useEffect(() => {
    //toggleLoading();
    async function fetchWeather() {
      if (editMode) {
        setEditMode(false);
        setForecast(null);
        setCurrent(null);
      }
      if (city === "") {
        setError(true);
      } else {
        const dataForecast = await fetchForecast(city, metric);
        const currentForecast = await fetchCurrentWeather(city, metric);
        if (dataForecast && currentForecast) {
          if (currentForecast.cod === "404") {
            setError(true)
          } else {
            setForecast(dataForecast.list);
            setCurrent(currentForecast);
            setError(false)
          }
        }
      }
      //toggleLoading();
    }
    fetchWeather();
  }, [city, metric]);

  if (!forecast || !current) {
    return (
      <div>
        {error ? (
          <TextField
            error={error}
            helperText={error ? 'city not found' : ''}
            id="city_name"
            label="enter a valid city"
            variant="standard"
            onBlur={(e) => setCity(e.target.value)}
          />
        ) : (
          <CircularProgress color="inherit" />
        )}
      </div>
    );
  }

  return (
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
                  src={`http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`}
                  alt={current.weather[0].main}
                  width={100}
                  height={100}
                />
                <Typography variant="subtitle1">
                  {current.weather[0].description}
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
                    helperText={error ? 'city not found' : ''}
                    id="city_name"
                    label="enter a city"
                    variant="standard"
                    onBlur={(e) => setCity(e.target.value)}
                  />
                ) : (
                  <Typography variant="h4">{current.name}</Typography>
                )}
                <Typography variant="h6">{current.main.temp}°F</Typography>

                <Typography
                  variant="caption"
                  noWrap={true}
                  style={{ marginTop: 15 }}
                >
                  feels like {current.main.feels_like}°F
                </Typography>
                <Typography variant="caption" noWrap={true}>
                  {current.main.humidity}% humidity
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
            {forecast
              .filter((_, i) => i % 9 === 0)
              .map((data, idx) => (
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
