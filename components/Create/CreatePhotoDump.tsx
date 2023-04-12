import { Box, Button, TextField, Typography } from "@mui/material"
import theme from "../../styles/theme/Theme"
import useCreatePhotodump from "../../utility/hooks/create/createPhotdump"
import CreateBox from "./CreateBox"

export default function CreatePhotoDump({ closeModal }: { closeModal: () => void }) {
  const { create, albumURL, updateAlbumURL } = useCreatePhotodump()
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
          create photo widget
        </Typography>
        <Typography variant="h6" style={{ ...$headerStyle, textAlign: "left" }}>
          url to google photos albumn
        </Typography>
        <TextField
          color={"secondary"}
          sx={{ width: "100%" }}
          value={albumURL}
          onChange={(e) => updateAlbumURL(e.target.value)}
        />

        <Button
          onClick={() =>
            create((isSuccess) => {
              if (isSuccess) {
                closeModal()
              }
            })
          }
        >
          {" "}
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
