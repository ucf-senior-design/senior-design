import { Box, Button, Typography } from "@mui/material"
import React from "react"
import { Event as EventType } from "../../utility/types/trip"
import { BackdropModal } from "../BackdropModal"
import ModifyEvent from "../Form/ModifyEvent"
import Event from "./Event"
import JoinableEvent from "./JoinableEvent"

export default function Day({
  day,
  events,
  joinableEvents,
}: {
  day: Date
  events: Array<EventType>
  joinableEvents: Array<EventType>
}) {
  const [showModifyEvent, setShowModifyEvent] = React.useState(false)

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
          return (
            <>
              <Event key={index} event={event} />
              <Button onClick={() => setShowModifyEvent(true)}>Modify</Button>
              <div style={$popUpDiv}>
                <BackdropModal
                  isOpen={showModifyEvent}
                  toggleShow={() => setShowModifyEvent(!showModifyEvent)}
                >
                  <ModifyEvent
                    key={index}
                    event={event}
                    closeModal={() => setShowModifyEvent(false)}
                  />
                </BackdropModal>
              </div>
            </>
          )
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

const $popUpDiv: React.CSSProperties = {
  position: "absolute",
  zIndex: 2,
}
