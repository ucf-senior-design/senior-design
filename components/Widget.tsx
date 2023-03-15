import { Button, Grid } from "@mui/material"
import useWidget from "../utility/hooks/widget"
import { Widget as TWidget } from "../utility/types/dashboard"
import React from "react"

export default function Widget({ widget }: { widget: TWidget }) {
  const hook = useWidget(widget)

  const [ui, setUI] = React.useState(
    <Grid item xs={hook.getGridSize()}>
      <Button onClick={() => hook.doIncreaseSize()}> incr </Button>
      <Button onClick={() => hook.doDecreaseSize()}> decr </Button>
      {hook.getWidgetUI()}
    </Grid>,
  )
  React.useEffect(() => {
    setUI(
      <Grid item xs={hook.getGridSize()}>
        <Button onClick={() => hook.doIncreaseSize()}> incr </Button>
        <Button onClick={() => hook.doDecreaseSize()}> decr </Button>
        {hook.getWidgetUI()}
      </Grid>,
    )
  }, [hook.widget])

  return <>{ui}</>
}
