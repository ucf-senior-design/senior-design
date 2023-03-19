import { Button, Grid, Popover, Typography } from "@mui/material"
import useWidget from "../utility/hooks/widget"
import { Widget as TWidget } from "../utility/types/trip"
import React from "react"
import { useResizable } from "../utility/hooks/resizable"

export default function Widget({ widget }: { widget: TWidget }) {
  const hook = useWidget(widget)
  const [handleSettings, setHandleSettings] = React.useState(false)
  const resize = useResizable()

  console.log(handleSettings)
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{ display: "flex", width: "100%", flexDirection: "column" }}
        onMouseEnter={() => setHandleSettings(true)}
        onMouseLeave={() => setHandleSettings(false)}
      >
        <div
          style={{
            height: "10px",

            display: "flex",
            justifyContent: "center",
          }}
        >
          <>
            {handleSettings && (
              <div style={{ display: "flex", width: "100%", flexDirection: "row" }}>
                {resize.canIncreaseSize(widget.key) && (
                  <Button onClick={() => resize.doIncreaseSize(widget.key)}> incr </Button>
                )}
                {resize.canDecreaseSize(widget.key) && (
                  <Button onClick={() => resize.doDecreaseSize(widget.key)}> decr </Button>
                )}
              </div>
            )}
          </>
        </div>
        {hook.getWidgetUI()}
      </div>
    </div>
  )
}
