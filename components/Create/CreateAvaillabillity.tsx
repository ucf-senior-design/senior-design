import { Box, Button, Chip, Divider, TextField, Typography } from "@mui/material"
import theme from "../../styles/theme/Theme"
import { useCreateAvailabilityWidget } from "../../utility/hooks/create/createAvaillabillity"
import DateRange from "../Form/DateRange"
import CreateBox from "./CreateBox"

export default function CreateAvailabillity({ closeModal }: { closeModal: () => void }) {
  const {
    updateTitle,
    createChipLabel,
    durations,
    title,
    addDuration,
    removeDuration,
    maybeCreate,
    localDuration,
    updateLocalDuration,
  } = useCreateAvailabilityWidget()

  return (
    <CreateBox>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
          flexDirection: "column",
        }}
      >
        <Typography variant="h4" style={{ ...$headerStyle, textAlign: "center" }}>
          Create Availabillity Widget
        </Typography>
        <Typography variant="h6" style={{ ...$headerStyle, textAlign: "left" }}>
          Title
        </Typography>
        <TextField
          color={"secondary"}
          sx={{ width: "100%" }}
          value={title}
          onChange={(e) => {
            updateTitle(e.target.value)
          }}
        />
        <Typography variant="h6" style={{ ...$headerStyle, textAlign: "left" }}>
          Add A New Availabillity
        </Typography>
        <DateRange
          startDate={localDuration.start}
          endDate={localDuration.end}
          updateDates={(startDate, endDate) => {
            updateLocalDuration({
              start: startDate,
              end: endDate,
            })
          }}
        />
        <Button sx={{ width: "100%" }} variant="outlined" onClick={() => addDuration()}>
          {" "}
          add new availability{" "}
        </Button>

        <Typography variant="h6" style={{ ...$headerStyle, textAlign: "left" }}>
          Currently Selected Availabillities
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "10px" }}>
          {durations.map((duration, index) => {
            return (
              <Chip
                key={index}
                label={createChipLabel(duration)}
                onDelete={() => removeDuration(index)}
              />
            )
          })}
        </Box>
        {durations.length === 0 ? <Typography> no availabilities selected </Typography> : <></>}
        <Divider sx={{ width: "100%", color: "#868686", borderBottomWidth: "30" }}></Divider>
        <Button
          color="primary"
          variant="contained"
          sx={{ width: "100%", marginTop: "30px" }}
          onClick={async () => {
            await maybeCreate((isSuccess) => {
              if (isSuccess) {
                closeModal()
              }
            })
          }}
        >
          Create Widget
        </Button>
      </Box>
    </CreateBox>
  )
}

const $headerStyle: React.CSSProperties = {
  fontWeight: 500,
  color: theme.palette.secondary.main,
  padding: 5,
}
