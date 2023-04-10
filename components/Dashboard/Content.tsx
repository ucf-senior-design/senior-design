import { useRef } from "react"
import { SortableContainer } from "react-sortable-hoc"
import { useResizable } from "../../utility/hooks/resizable"
import { CreateItem } from "./CreateItem"

export default function Content() {
  const { resizable, onSortEnd, onSortStart } = useResizable()
  const ref = useRef()
  const SortableList = SortableContainer(() => {
    return (
      <div
        style={{
          display: "grid",
          width: "100%",
          gridAutoFlow: "dense",
          paddingLeft: "30px",
          paddingRight: "30px",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gridGap: "0px",
          gridAutoRows: "3px",
        }}
      >
        {resizable.order.map((value, index) => (
          <CreateItem key={index} index={index} value={value} />
        ))}
      </div>
    )
  })

  return (
    <SortableList
      axis="xy"
      onSortStart={onSortStart}
      onSortEnd={onSortEnd}
      useDragHandle
      useWindowAsScrollContainer={true}
    />
  )
}
