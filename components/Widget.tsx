import { Button, Grid, Popover, Typography } from "@mui/material"
import useWidget from "../utility/hooks/widget"
import { Widget as TWidget, WidgetType } from "../utility/types/trip"
import React from "react"
import { SortableHandle } from "react-sortable-hoc"
import { useResizable } from "../utility/hooks/resizable"
import { Delete, Fullscreen, FullscreenExit, SelectAll } from "@mui/icons-material"

export default function Widget({ widget }: { widget: TWidget }) {
  const hook = useWidget(widget)
  const [widgetInfo, setWidgetInfo] = React.useState<{ type: WidgetType; uid: string }>()
  const [handleSettings, setHandleSettings] = React.useState(false)
  const resize = useResizable()

  const DoMoveButton = SortableHandle(() => (
    <Button
      sx={{
        color: "black",
        borderColor: "#545270",
      }}
      disabled={widgetInfo !== undefined && widgetInfo.type === "day"}
      color="secondary"
      variant="text"
    >
      <SelectAll sx={{ fontSize: "18px" }} />
    </Button>
  ))

  React.useEffect(() => {
    let splitKey = widget.key.split(":")
    setWidgetInfo({
      type: splitKey[0] as WidgetType,
      uid: splitKey[0] !== "photo" ? splitKey[1] : splitKey[1] + ":" + splitKey[2],
    })
  }, [])

  return (
    <div style={{ display: "flex", flexDirection: "column", margin: "10px" }}>
      <div
        style={{ display: "flex", width: "100%", flexDirection: "row" }}
        onMouseEnter={() => setHandleSettings(true)}
        onMouseLeave={() => setHandleSettings(false)}
      >
        <div
          style={{
            height: "50px",
            alignItems: "start",
            display: "flex",
            gap: "10px",
            justifyContent: "center",
          }}
        >
          <div style={{ width: "50px" }}>
            {handleSettings && (
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <DoMoveButton />
                <Button
                  sx={{
                    color: "black",
                    borderColor: "#545270",
                  }}
                  disabled={widgetInfo !== undefined && widgetInfo.type === "day"}
                  color="secondary"
                  variant="text"
                  onClick={() => {
                    if (widgetInfo !== undefined) hook.deleteWidget(widgetInfo.uid, widgetInfo.type)
                  }}
                >
                  <Delete sx={{ fontSize: "18px" }} />
                </Button>
                <Button
                  disabled={!resize.canIncreaseSize(widget.key)}
                  sx={{
                    color: "black",
                    borderColor: "#545270",
                  }}
                  color="secondary"
                  variant="text"
                  onClick={() => resize.doIncreaseSize(widget.key)}
                >
                  <Fullscreen sx={{ fontSize: "18px" }} />
                </Button>

                <Button
                  disabled={!resize.canDecreaseSize(widget.key)}
                  sx={{
                    marginRight: "5px",
                    marginLeft: "5px",
                    color: "black",
                    borderColor: "#545270",
                  }}
                  color="secondary"
                  variant="text"
                  onClick={() => resize.doDecreaseSize(widget.key)}
                >
                  <FullscreenExit sx={{ fontSize: "18px" }} />
                </Button>
              </div>
            )}
          </div>
        </div>
        <div style={{ width: "100%" }}>{hook.getWidgetUI()}</div>
      </div>
    </div>
  )
}
