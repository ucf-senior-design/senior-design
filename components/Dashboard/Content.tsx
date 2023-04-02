import { useResizable } from "../../utility/hooks/resizable"
import { Grid } from "@mui/material"
import React from "react"
import { SortableContainer, SortableElement } from "react-sortable-hoc"
import { useTrip } from "../../utility/hooks/trip"

export default function Content() {
  const { getSize, resizable, onSortEnd, getWidget } = useResizable()
  const { trip } = useTrip()

  const SortableItem = SortableElement(({ value }: { value: string }) => (
    <Grid item xs={12} md={getSize(value)}>
      {getWidget(value) ?? <></>}
    </Grid>
  )) as any

  const SortableList = SortableContainer(() => {
    return (
      <Grid
        container
        gap={0.8}
        sx={{ paddingLeft: { xs: 10, lg: 20 }, paddingRight: { xs: 10, md: 20, lg: 30 } }}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {resizable.order.map((value, index) => (
          <SortableItem key={`item-${index}`} index={index} value={value} />
        ))}
      </Grid>
    )
  })

  return <SortableList axis="xy" onSortEnd={onSortEnd} />
}
