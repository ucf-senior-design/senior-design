import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import DraggableComponent from '../components/DashboardComponents/DraggableComponent';
import WeatherWidget from '../components/DashboardComponents/Weather/WeatherWidget';

export default function Test() {
  const [weatherwidget, setweatherwidget] = useState(false);

  return (
    <div style={$wrapper}>
      <Button onClick={() => setweatherwidget(!weatherwidget)}>
        click me to toggle the weather widget
      </Button>
      <Typography>
        i am also draggable!!!!!!!!!!!!!!!!!!!!!
      </Typography>
      <Typography>
        later, users will be able to switch from imperial to the other one
      </Typography>
      {weatherwidget ? 
      <DraggableComponent>
        <WeatherWidget />
      </DraggableComponent>
       : <></>}
    </div>
  );
}

const $wrapper: React.CSSProperties = {
  width: '100%',
  height: '100%'
}