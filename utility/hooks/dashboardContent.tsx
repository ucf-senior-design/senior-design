import React from "react"
import { SortableContainer, SortableElement } from "react-sortable-hoc"

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

  const [items, setItems] = React.useState([
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
  ])

  function moveArray(oldIndex: number, newIndex: number) {
    let a: Array<string> = []
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

  const SortableItem = SortableElement(({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  )) as any

  const SortableList = SortableContainer(() => {
    return (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 4,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {items.map((value, index) => (
          <SortableItem key={`item-${value}`} index={index}>
            <div style={{ width: "300px", height: "300px", backgroundColor: "yellow" }}>
              {`item-${value}`}{" "}
            </div>
          </SortableItem>
        ))}
      </div>
    )
  })

  return (
    <DashboardContentContext.Provider value={{ title }}>
      <SortableList axis="xy" onSortEnd={onSortEnd} />;{children}
    </DashboardContentContext.Provider>
  )
}
