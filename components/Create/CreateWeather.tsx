import { Box, Button, Typography } from "@mui/material"
import theme from "../../styles/theme/Theme"
import useCreateWeather from "../../utility/hooks/create/createWeather"
import CreateBox from "./CreateBox"

export default function CreateWeather({ closeModal }: { closeModal: () => void }) {
  const { create } = useCreateWeather()
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
        <Typography variant="h5" style={{ ...$headerStyle, textAlign: "center" }}>
          would you like to add a weather widget for this trip?
        </Typography>
        <Button
          sx={{ width: "100%", marginTop: "5px" }}
          variant="contained"
          onClick={() =>
            create((isSuccess) => {
              if (isSuccess) {
                closeModal()
              }
            })
          }
        >
          yes
        </Button>
        <Button
          sx={{ width: "100%", marginTop: "5px" }}
          variant="outlined"
          onClick={() => closeModal()}
        >
          no
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
