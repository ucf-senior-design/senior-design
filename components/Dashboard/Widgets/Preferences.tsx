import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import ParkIcon from "@mui/icons-material/Park"
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera"
import SportsTennisIcon from "@mui/icons-material/SportsTennis"
import { Box, Button, Chip, Paper, Typography } from "@mui/material"

export function PreferencesWidget({
  // preferenceWidget,
  tripID,
}: {
  tripID: string
  // preferenceWidget: PreferencesWidget
}) {
  // const {
  //   uid = "AwV5uEuEFRz8Um0B80Kj",
  //   sightseeing = ["user"],
  //   sports = [],
  //   lowPrice = [],
  //   nature = ["user"],
  //   highPrice = [],
  //   medPrice = [],
  //   veryHighPrice = [],
  //   title = "Trip event preferences",
  // } = usePreference(PreferencesWidget)

  const votes_cost = [2, 5, 1, 2]
  const votes_act = [4, 5, 1]

  const sum_cost = votes_cost.reduce((a, b) => a + b)
  const sum_act = votes_act.reduce((a, b) => a + b)

  function Preferences() {
    return (
      <>
        <Paper sx={{ padding: "20px", width: "80vw", maxWidth: "300px" }}>
          <Typography
            sx={{ fontSize: "20px", fontWeight: "600", textAlign: "center", padding: "1" }}
          >
            preferences Selection
          </Typography>
          <p>Select all acceptable cost preferences from the below list:</p>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Chip
              variant="outlined"
              icon={<AttachMoneyIcon />}
              label={
                <Typography padding={1} fontSize={14}>
                  very high - {(votes_cost[0] / sum_cost) * 100}%
                </Typography>
              }
              size="medium"
              sx={{ paddingTop: 1.5, paddingBottom: 1.5, paddingLeft: 0.5, paddingRight: 0.5 }}
            />
            <Chip
              variant="outlined"
              icon={<AttachMoneyIcon />}
              label={
                <Typography padding={1} fontSize={14}>
                  high - {(votes_cost[1] / sum_cost) * 100}%
                </Typography>
              }
              size="medium"
              sx={{ paddingTop: 1.5, paddingBottom: 1.5, paddingLeft: 0.5, paddingRight: 0.5 }}
            />
            <Chip
              variant="outlined"
              icon={<AttachMoneyIcon />}
              label={
                <Typography padding={1} fontSize={14}>
                  medium - {(votes_cost[2] / sum_cost) * 100}%
                </Typography>
              }
              size="medium"
              sx={{ paddingTop: 1.5, paddingBottom: 1.5, paddingLeft: 0.5, paddingRight: 0.5 }}
            />
            <Chip
              variant="outlined"
              icon={<AttachMoneyIcon />}
              label={
                <Typography padding={1} fontSize={14}>
                  low - {(votes_cost[3] / sum_cost) * 100}%
                </Typography>
              }
              size="medium"
              sx={{ paddingTop: 1.5, paddingBottom: 1.5, paddingLeft: 0.5, paddingRight: 0.5 }}
            />
          </Box>

          <p>Select all acceptable outdoors activities preferences from the below list:</p>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Chip
              variant="outlined"
              icon={<SportsTennisIcon />}
              label={
                <Typography padding={1} fontSize={14}>
                  nature - {(votes_act[0] / sum_act) * 100}%
                </Typography>
              }
              size="medium"
              sx={{ paddingTop: 1.5, paddingBottom: 1.5, paddingLeft: 0.5, paddingRight: 0.5 }}
            />
            <Chip
              variant="outlined"
              icon={<ParkIcon />}
              label={
                <Typography padding={1} fontSize={14}>
                  sports - {(votes_act[1] / sum_act) * 100}%
                </Typography>
              }
              size="medium"
              sx={{ paddingTop: 1.5, paddingBottom: 1.5, paddingLeft: 0.5, paddingRight: 0.5 }}
            />
            <Chip
              variant="outlined"
              icon={<PhotoCameraIcon />}
              label={
                <Typography padding={1} fontSize={14}>
                  sightseeing - {(votes_act[2] / sum_act) * 100}%
                </Typography>
              }
              size="medium"
              sx={{ paddingTop: 1.5, paddingBottom: 1.5, paddingLeft: 0.5, paddingRight: 0.5 }}
            />

            <Button variant="outlined">add preference</Button>
          </Box>
        </Paper>
      </>
    )
  }
}
