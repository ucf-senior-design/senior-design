import { Box, MenuItem, Select, TextField, Typography, Button } from "@mui/material"
import theme from "../../styles/theme/Theme"
import CreateBox from "./CreateBox"

export default function CreatePreferences({ closeModal }: { closeModal: () => void }) {
  return (
    <CreateBox>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          flexDirection: "column",
        }}
      >
        <Typography variant="h4" style={{ ...$headerStyle, textAlign: "center" }}>
          {" "}
          Create Preferences Widget{" "}
        </Typography>
        <Typography variant="h6" style={{ ...$headerStyle, textAlign: "left" }}>
          {" "}
          What are these preferences for?
        </Typography>
        <TextField color={"secondary"} sx={{ width: "100%" }} value={""} onChange={(e) => {}} />
        <Typography variant="h6" style={{ ...$headerStyle, textAlign: "left" }}>
          {" "}
          What are your outdoor activity preferences?{" "}
        </Typography>
        <Select
          color={"secondary"}
          sx={{ width: "100%" }}
          onChange={() => console.log("update outdoor activity preferences")}
        >
          <MenuItem value={"SPORTS"}> Sports </MenuItem>
          <MenuItem value={"NATURE"}> Nature </MenuItem>
          <MenuItem value={"SIGHTSEEING"}> Sightseeing</MenuItem>
        </Select>
        <Typography variant="h6" style={{ ...$headerStyle, textAlign: "left" }}>
          {" "}
          What are your price preferences?{" "}
        </Typography>
        <Select
          color={"secondary"}
          sx={{ width: "100%" }}
          onChange={() => console.log("update price preferences")}
        >
          <MenuItem value={"LOWPRICE"}> less than $500 </MenuItem>
          <MenuItem value={"MEDPRICE"}> $500 - $1000 </MenuItem>
          <MenuItem value={"HIGHPRICE"}> $1000 - $2500 </MenuItem>
          <MenuItem value={"VERYHIGHPRICE"}> more than $2500 </MenuItem>
        </Select>
        <Button
          sx={{ width: "100%", marginTop: "10px" }}
          color={"primary"}
          variant="contained"
          onClick={() => {
            console.log("create widget")
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
