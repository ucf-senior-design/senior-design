import { CircularProgress, Divider, Grid, Paper, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import theme from '../../../styles/theme/Theme';
import { CurrentData, Forecast } from '../../../utility/types/weather';
import { fetchCurrentWeather } from './GetCurrentWeather';
import { fetchForecast } from './GetForecast';

interface Props {
  name:string,
  metric: string
}

const WeatherWidget: React.FC<Props> = ({ name, metric }) => {
  const [forecast, setForecast] = React.useState<Forecast[] | null>(null);
  const [current, setCurrent] = React.useState<CurrentData | null>(null);

  React.useEffect(() => {
    async function fetchWeather() {
      const dataForecast = await fetchForecast(name, metric);
      const currentForecast = await fetchCurrentWeather(name, metric);
      setForecast(dataForecast.list);
      setCurrent(currentForecast);
    }
    fetchWeather();
  }, [name, metric]);

  if (!forecast || !current) {
    return <div><CircularProgress /></div>;
  }

  return (
    <div>
        <Paper square={false} style={{display:'inline-block', borderRadius:5, backgroundColor:theme.palette.primary.dark}}>
            <Grid
            container
            direction="row"
            justifyContent="space-around"
            >
                <Stack
                direction={'row'}
                justifyContent={'space-around'}
                divider={<Divider orientation="vertical" flexItem variant='middle' />}>
                    <Stack
                    justifyContent={'center'}
                    alignItems={'center'}
                    margin={1}
                    marginRight={3}>
                        <Image src={`http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`} alt={current.weather[0].main} width={100} height={100}/>
                        <Typography variant='subtitle1'>{current.weather[0].description}</Typography>
                    </Stack>
                    <Stack
                    justifyContent={'center'}
                    alignItems={'center'}
                    margin={1}
                    marginLeft={3}>
                        <Typography variant='h4'>{current.name}</Typography>
                        <Typography variant='h6'>{current.main.temp}°F</Typography>

                        <Typography variant='caption' noWrap={true} style={{marginTop:15}}>feels like {current.main.feels_like}°F</Typography>
                        <Typography variant='caption' noWrap={true}>{current.main.humidity}% humidity</Typography>
                    </Stack>
                </Stack>
            </Grid>
            <Divider orientation='horizontal' variant='middle'/>
            <Stack direction={'row'}
                divider={<Divider orientation="vertical" flexItem variant='middle' />}>
                    {/* TODO: Currently, the weather forecast is grabbed during different times (the api gives us 3 hour forecasts but it's difficult to grab all the noon forecasts etc.)*/}
                    {forecast.filter((_, i) => i % 9 === 0).map((data, idx) => (
                        <Stack
                        key={idx}
                        justifyContent={'center'}
                        alignItems={'center'}
                        margin={1}>
                            <Typography>
                                {(new Date(data.dt * 1000).toLocaleDateString("en-US", {weekday:'short'}))}
                            </Typography>
                            <Image src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt={data.weather[0].main} width={50} height={50}/>
                            <Typography variant='caption'>{data.main.temp}°F</Typography>
                        </Stack>
                    ))}

                </Stack>
        </Paper>
    </div>
  );
};

const $wrapper: React.CSSProperties = {
    width: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const $iconWrapper: React.CSSProperties = {
    margin:0
  }
  
export default WeatherWidget;
