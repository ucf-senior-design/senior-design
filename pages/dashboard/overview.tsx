import { Button, Paper, Typography } from "@mui/material"
import { useState } from "react"
import { Responsive, WidthProvider } from "react-grid-layout"
import WeatherWidget from "../../components/Dashboard/Widgets/WeatherWidget"

export default function Overview() {
  const [weatherwidget, setweatherwidget] = useState(false)
  const layout = [
    { i: "tripComponent", x: 4, y: 0, w: 8, h: 4, isResizable: false },
    { i: "weatherComponent", x: 0, y: 0, w: 4, h: 2, isResizable: false },
  ]
  // TODO: adjust 'h' to the amount of components coming from trips/events, right now this is a fixed value
  //  Will try and implement once that api is working

  const ResponsiveGridLayout = WidthProvider(Responsive)
  const cols = { lg: 14, md: 10, sm: 6, xs: 4, xxs: 2 }
  const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }

  const item1 = {
    id: 0,
    date: "october 1st",
    events: [
      {
        name: "epcot",
        location: "your mom",
      },
    ],
  }
  const item2 = {
    id: 1,
    date: "october 1st",
    events: [
      {
        name: "epcot",
        location: "your mom",
      },
      {
        name: "epcot",
        location: "your mom",
      },
    ],
  }

  const example = [item1, item2]

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={{ lg: layout, md: layout, sm: layout, xs: layout, xxs: layout }}
      breakpoints={breakpoints}
      cols={cols}
      autoSize={true}
      compactType="vertical"
      style={{
        overflowY: "auto",
        width: "100%",
        height: "100%",
        display: "flex",
      }}
    >
      {weatherwidget ? (
        <div key="weatherComponent" style={$wrapper}>
          <Paper
            square={false}
            style={{
              display: "inline-block",
              borderRadius: 5,
              backgroundColor: "#E1E2DE",
            }}
          >
            <WeatherWidget />
          </Paper>
        </div>
      ) : (
        <></>
      )}
      <div key="tripComponent" style={$wrapper}>
        <Paper
          square={false}
          style={{
            display: "inline-block",
            borderRadius: 5,
            backgroundColor: "#E1E2DE",
            width: "100%",
            padding: 5,
            margin: 5,
            marginTop: 0,
          }}
        >
          <Button onClick={() => setweatherwidget(!weatherwidget)}>
            click me to toggle the weather widget
          </Button>
          <Typography>i am also draggable!!!!!!!!!!!!!!!!!!!!!</Typography>
          <Typography>
            later, users will be able to switch from imperial to the other one
          </Typography>
          <Typography>
            it should also grab the trip location name as a default later on, (can implement when
            trips is working)
          </Typography>
        </Paper>
        {example.map((item) => (
          <Paper
            key={item.id}
            square={false}
            style={{
              display: "inline-block",
              borderRadius: 5,
              backgroundColor: "#E1E2DE",
              width: "100%",
              padding: 10,
              margin: 5,
            }}
          >
            <Typography variant="h4">{item.date}</Typography>
            {item.events.map((eventitem, index) => (
              <div key={index}>
                <p>{eventitem.name}</p>
                <p>Location: {eventitem.location}</p>
              </div>
            ))}
          </Paper>
        ))}
      </div>
    </ResponsiveGridLayout>
  )
}

const $wrapper: React.CSSProperties = {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
}
