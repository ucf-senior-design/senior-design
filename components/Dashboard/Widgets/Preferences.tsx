import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import ParkIcon from "@mui/icons-material/Park"
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera"
import SportsTennisIcon from "@mui/icons-material/SportsTennis"
import { Box, Button, Chip, Paper, Typography } from "@mui/material"

export const PreferencesWidget = () => {

  return (
    <>
      <Paper sx={{ padding: "20px", width: "80vw", maxWidth: "300px" }}>
        <p>Select all acceptable cost preferences from the below list:</p>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Chip
            variant="outlined"
            icon={<AttachMoneyIcon />}
            label={
              <Typography padding={1} fontSize={14}>
                very high
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
                high
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
                medium
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
                low
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
                    nature
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
                    sports
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
                    sightseeing
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
