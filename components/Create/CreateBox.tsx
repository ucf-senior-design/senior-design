import { Box } from "@mui/material"
import React from "react"

/** Wrapper for content within a popup for creating a widget
 */
export default function CreateBox({ children }: { children: React.ReactNode }) {
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
      <Box style={{ overflowY: "auto", maxHeight: "850px", width: "100%", gap: 2 }}>{children}</Box>
    </Box>
  )
}
