import { Box, TextField, Typography, Button } from "@mui/material"
import theme from "../../styles/theme/Theme"
import useCreatePoll from "../../utility/hooks/create/createPoll"
import CreateBox from "./CreateBox"
import { MuiChipsInput } from "mui-chips-input"

export default function CreatePoll({ closeModal }: { closeModal: () => void }) {
  const { title, updateTitle, options, updateOptions, create } = useCreatePoll()
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
          create poll
        </Typography>
        <Typography variant="h6" style={{ ...$headerStyle, textAlign: "left" }}>
          title
        </Typography>
        <TextField
          color={"secondary"}
          sx={{ width: "100%" }}
          value={title}
          onChange={(e) => updateTitle(e.target.value)}
        />
        <Typography variant="h6" style={{ ...$headerStyle, textAlign: "left" }}>
          poll options
        </Typography>
        <MuiChipsInput
          sx={{ width: "100%" }}
          color="secondary"
          value={options}
          onChange={(value) => updateOptions(value)}
        />
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
          Create
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
