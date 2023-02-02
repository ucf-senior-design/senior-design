import { Button } from '@mui/material';
import GetCurrentWeather from '../components/GetCurrentWeather';
import GetForecast from '../components/GetForecast';

export default function Test() {
  return (
    <div>
      <Button onClick={async () => await GetForecast()}>
        click 4 weather forecast :]
      </Button>
      <Button onClick={async () => await GetCurrentWeather()}>
        click 4 current weather!!!! :]
      </Button>
    </div>
  );
}
