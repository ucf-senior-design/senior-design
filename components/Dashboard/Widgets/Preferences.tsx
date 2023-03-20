import {
  Box,
  Button,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material"
import React from "react"
import { useTrip } from "../../../utility/hooks/trip"

export function PreferencesWidget() {
  const { trip } = useTrip()
  const dummy = {
    title: "activity preferences",
    options: [1, 2, 3],
  }

  const [checked, setChecked] = React.useState([0])

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  return (
    <>
      <Paper sx={{ padding: "20px", width: "80vw", maxWidth: "300px" }}>
        <Typography sx={{ fontSize: "20px", fontWeight: "600", textAlign: "center" }}>
          {dummy.title}
        </Typography>
        Select all acceptable preferences from the below list:
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
            {dummy.options.map((item) => {
              const labelId = `checkbox-list-label-${item}`

              return (
                <ListItem
                  key={item}
                  secondaryAction={<IconButton edge="end" aria-label="comments"></IconButton>}
                  disablePadding
                >
                  <ListItemButton role={undefined} onClick={handleToggle(item)} dense>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={checked.indexOf(item) !== -1}
                        tabIndex={-1}
                        color="secondary"
                      />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={`Option ${item + 1}`} />
                  </ListItemButton>
                </ListItem>
              )
            })}
          </List>
        </Box>
        <Button variant="outlined">vote</Button>
      </Paper>
    </>
  )
}
