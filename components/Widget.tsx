import { Button, Grid } from "@mui/material"
import useWidget from "../utility/hooks/widget"
import { Widget as TWidget } from "../utility/types/trip"
import React from "react"
import { useResizable } from "../utility/hooks/resizable"

export default function Widget({ widget }: { widget: TWidget }) {
  const hook = useWidget(widget)
  const resize = useResizable()

  return (
    <>
      <Button onClick={() => resize.doIncreaseSize(widget.key)}> incr </Button>
      <Button onClick={() => resize.doDecreaseSize(widget.key)}> decr </Button>
      {hook.getWidgetUI()}
    </>
  )
}
