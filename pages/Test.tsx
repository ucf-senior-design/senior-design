import { Button, Paper, Typography } from '@mui/material';
import { useState } from 'react';
// import DraggableComponent from '../components/DashboardComponents/DraggableComponent';
import ResponsiveGridLayout from 'react-grid-layout';
import WeatherWidget from '../components/DashboardComponents/Weather/WeatherWidget';
// TODO: Remove DraggableComponent after fully implementing react-grid-layout

export default function Test() {
  const [weatherwidget, setweatherwidget] = useState(false);
  const layout = [
    { i: 'weatherComponent', x: 0, y: 0, w: 3, h: 2, isResizable: false },
    { i: 'tripComponent', x: 3, y: 0, w: 8, h: 1, isResizable: false },
  ];

  return (
    <ResponsiveGridLayout
      className="layout"
      layout={layout}
      cols={12}
      width={1250}
      autoSize={true}
    >
      <div key="weatherComponent" style={$wrapper}>
        <Paper
          square={false}
          style={{
            display: 'inline-block',
            borderRadius: 5,
            backgroundColor: '#E1E2DE',
          }}
        >
          {weatherwidget ? <WeatherWidget /> : <></>}
        </Paper>
      </div>
      <div key="tripComponent" style={$wrapper}>
        <Paper
          square={false}
          style={{
            display: 'inline-block',
            borderRadius: 5,
            backgroundColor: '#E1E2DE',
          }}
        >
          <Button onClick={() => setweatherwidget(!weatherwidget)}>
            click me to toggle the weather widget
          </Button>
          <Typography>i am also draggable!!!!!!!!!!!!!!!!!!!!!</Typography>
          <Typography>
            later, users will be able to switch from imperial to the other one
          </Typography>
        </Paper>
      </div>
    </ResponsiveGridLayout>
  );
}

const $wrapper: React.CSSProperties = {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#FFFFFF',
};

const $layout: React.CSSProperties = {
  width: '100%',
};
