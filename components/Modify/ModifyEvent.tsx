import { Box, Button, TextField, Typography } from "@mui/material"
import React from "react"
import theme from "../../styles/theme/Theme"
import useModifyEvent from "../../utility/hooks/modify/modifyEvent"
import { Event as EventType } from "../../utility/types/trip"
import DateRange from "../Form/DateRange"
import PlacesSearch from "../Form/PlacesSearch"

export default function ModifyEvent({
  closeModal,
  event,
}: {
  closeModal: () => void
  event: EventType
}) {
  const { updateDuration, updateLocation, updateDescription, updateTitle, modify, modifiedEvent } =
    useModifyEvent(event)

  const [title, setTitle] = React.useState(event.title)
  const [description, setDescription] = React.useState(event.description)
  const [startTime, setStartTime] = React.useState(event.duration.start)
  const [endTime, setEndTime] = React.useState(event.duration.end)
  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: "10px",
        padding: "20px",
        display: "flex",
        maxWidth: "750px",
        overflowY: "auto",
        width: "80vw",
        height: "100%",
        alignContent: "center",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box style={{ overflowY: "auto", maxHeight: "850px", width: "100%", gap: 2 }}>
        <Typography variant="h4" style={{ ...$headerStyle, textAlign: "center" }}>
          Modifying {event.title}
        </Typography>
        <Typography variant="h6" style={{ ...$headerStyle, textAlign: "left" }}>
          title
        </Typography>
        <TextField
          color={"secondary"}
          sx={{ width: "100%" }}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
            updateTitle(e.target.value)
          }}
        />

        <Typography variant="h6" style={{ ...$headerStyle, textAlign: "left" }}>
          description
        </Typography>
        <TextField
          color={"secondary"}
          sx={{ width: "100%" }}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value)
            updateDescription(e.target.value)
          }}
        />
        <Typography variant="h6" style={{ ...$headerStyle, textAlign: "left" }}>
          destination
        </Typography>
        <PlacesSearch
          place={event.location}
          types={[]}
          setPlace={(_, place) => updateLocation(place)}
        />

        <Typography variant="h6" style={{ ...$headerStyle, textAlign: "left" }}>
          duration
        </Typography>
        <DateRange
          startDate={modifiedEvent.duration.start}
          endDate={modifiedEvent.duration.end}
          updateDates={(startDate, endDate) => updateDuration(startDate, endDate)}
          showTime
        />
        <Button
          sx={{ width: "100%", marginTop: "10px" }}
          color={"primary"}
          variant="contained"
          onClick={() =>
            modify((isSuccess: any) => {
              if (isSuccess) closeModal()
            })
          }
        >
          Save Changes
        </Button>
      </Box>
    </Box>
  )
}

const $headerStyle: React.CSSProperties = {
  fontWeight: 500,
  color: theme.palette.secondary.main,
  padding: 5,
}
