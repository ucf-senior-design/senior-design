import { useTheme } from "@emotion/react"
import { Grid } from "@mui/material"
import React from "react"
import { SortableContainer, SortableElement } from "react-sortable-hoc"
import Widget from "../../components/Widget"
import { useTrip } from "./trip"

interface DashboardContent {
  title: string
}

const DashboardContentContext = React.createContext<DashboardContent | null>(null)

export function useDashboardContent() {
  const context = React.useContext(DashboardContentContext)

  if (!context) {
    throw Error("useDashboardContent must be used within an AuthProvider")
  }
  return context
}

export function DashboardContentProvder({ children }: { children: React.ReactNode }) {
  let title = "title"
  const { trip } = useTrip()

  let widgets: Array<React.ReactNode> = [
    <Widget
      key={"1"}
      widget={{
        key: "suggestion:5SIaabTavwsmKGPrfTGy",
        size: 0,
        index: 0,
      }}
    />,
    <Widget
      key={"2"}
      widget={{
        key: "suggestion:6iTldrtHhzzysFMhOgRM",
        size: 0,
        index: 0,
      }}
    />,
    <Widget
      key={"3"}
      widget={{
        key: "suggestion:F5UkHGJPJtCNNM3c0nIv",
        size: 0,
        index: 0,
      }}
    />,
  ]
  const [items, setItems] = React.useState(widgets)

  function moveArray(oldIndex: number, newIndex: number) {
    let a: Array<React.ReactNode> = []
    for (let i = 0; i < items.length; i++) {
      if (i === newIndex) {
        if (oldIndex < newIndex) {
          a.push(items[i])
          a.push(items[oldIndex])
        } else {
          a.push(items[oldIndex])
          a.push(items[i])
        }
      } else if (i !== oldIndex) {
        a.push(items[i])
      }
    }
    return a
  }
  function onSortEnd({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) {
    setItems(moveArray(oldIndex, newIndex))
  }

  const SortableItem = SortableElement(({ value }: { value: React.ReactNode }) => (
    <>{value}</>
  )) as any

  const SortableList = SortableContainer(() => {
    return (
      <Grid container gap={1} alignItems={"center"} justifyContent={"center"}>
        {items.map((value, index) => (
          <SortableItem key={`item-${index}`} index={index} value={value} />
        ))}
      </Grid>
    )
  })

  return (
    <DashboardContentContext.Provider value={{ title }}>
      {trip.suggestions.size === 3 && <SortableList axis="xy" onSortEnd={onSortEnd} />}
      {children}
    </DashboardContentContext.Provider>
  )
}
