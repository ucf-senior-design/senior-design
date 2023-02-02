import { Button } from "@mui/material";
import GetForecast from "../components/GetForecast";

export default function Test() {
    return (
      <div>
        <Button onClick={GetForecast}>
          click 4 weather forecast :]
        </Button>
      </div>
    );
  }