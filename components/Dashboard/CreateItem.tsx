import { useResizable } from "../../utility/hooks/resizable"
import { Box } from "@mui/material"
import React, { useState, useEffect, useRef } from "react"
import { SortableElement } from "react-sortable-hoc"

export function CreateItem({ index, value }: { index: number; value: string }) {
  const { getSize, getWidget } = useResizable()

  const [size, setSize] = useState({
    height: 0,
    width: 0,
  })
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current !== null)
      setSize({
        // @ts-ignore
        height: ref.current.clientHeight,
        // @ts-ignore
        width: ref.current.clientWidth,
      })
  }, [])

  console.log(size)

  const SortableItem = SortableElement(({ value }: { value: string }) => (
    <Box
      sx={{
        gridColumn: { xs: "span 4", md: `span ${getSize(value)}` },
        gridRow: `span ${Math.ceil(size.height / 3)}`,
      }}
    >
      <div ref={ref}>{getWidget(value) ?? <></>}</div>
    </Box>
  )) as any

  return <SortableItem key={`item-${index}`} index={index} value={value} />
}
