import { Box, Button, TextField, Typography } from "@mui/material"
import { MuiChipsInput } from "mui-chips-input"
import theme from "../../styles/theme/Theme"
import useCreateSuggestion from "../../utility/hooks/create/createSuggestion"
import CreateBox from "./CreateBox"

export default function CreateSuggestion({ closeModal }: { closeModal: () => void }) {
  const { title, updateTitle, options, updateOptions, create } = useCreateSuggestion()
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
          create suggestions widget
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
          add suggestions
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
