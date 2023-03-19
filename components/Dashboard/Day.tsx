import { Typography, Box } from "@mui/material"
import { join } from "path"
import { Event as EventType } from "../../utility/types/trip"
import Event from "./Event"
import JoinableEvent from "./JoinableEvent"

export default function Day({
  day,
  events,
  joinableEvents,
  weatherIcon,
  temperature,
}: {
  day: Date
  events: Array<EventType>
  joinableEvents: Array<EventType>
  weatherIcon: React.ReactNode
  temperature: number
}) {
  return (
    <Box sx={{ padding: "10px" }}>
      {/* Day header that includes date, weather icon, and temperature*/}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 2,
          marginBottom: "40px",
        }}
      >
        <Typography sx={{ fontWeight: 900, fontSize: "40px" }}>
          {day.toLocaleDateString("en-US", { month: "long", day: "numeric" })}
        </Typography>
        {weatherIcon}
        <Typography sx={{ fontWeight: 700, fontSize: "24px" }}>{temperature}</Typography>
      </Box>

      {/* List of events this user has joined in chronological order */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
          gap: 2,
          marginBottom: "10px",
        }}
      >
        {events.length === 0 && (
          <Box
            style={{
              fontWeight: "500",
              fontSize: "20px",
              width: "100%",
              textAlign: "center",
            }}
          >
            No Events{" "}
          </Box>
        )}
        {events.map((event, index) => {
          return <Event key={index} event={event} />
        })}
      </Box>

      {/* List of joinable this user has joined in chronological order */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 2,
          marginBottom: "10px",
        }}
      >
        {joinableEvents.map((event, index) => {
          return <JoinableEvent key={index} event={event} />
        })}
      </Box>
    </Box>
  )
}
