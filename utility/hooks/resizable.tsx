import React from "react"
import Widget from "../../components/Widget"
import { StoredLocation, WidgetType } from "../types/trip"
import { useLocalStorage } from "react-use-storage"
import { ConstructionOutlined } from "@mui/icons-material"
import { send } from "process"

type ResizableUseState = {
  size: Map<string, number> // stores the size of each item <key,size>
  order: Array<string> // stores the order of each item [key]
  widgets: Map<string, React.ReactNode> // stores each widget <key, React.ReactNode>
}
interface Resizable {
  doIncreaseSize: (key: string) => void
  doDecreaseSize: (key: string) => void
  canIncreaseSize: (key: string) => boolean
  canDecreaseSize: (key: string) => boolean
  getSize: (key: string) => number
  handleItemUpdate: (dashboardItem: Array<string>) => void
  readLayout: (layout: Array<StoredLocation>) => void
  resizable: ResizableUseState
  createKey: (type: WidgetType, uid: string) => string
  getWidget: (key: string) => React.ReactNode
  onSortEnd: ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => void
  addItem: (key: string) => void
  getStorableLayout: (order: Array<string>) => void
}

const ResizableContext = React.createContext<Resizable | null>(null)

export function useResizable() {
  const context = React.useContext(ResizableContext)

  if (!context) {
    throw Error("useResizable  must be used within an ResizableProvider")
  }
  return context
}

/**
 * Creates an envionrment of dashboard elements to be repositioned and resized dynamically.
 */
export function ResizableProvider({ children }: { children: React.ReactNode }) {
  const [resizable, setResizable] = React.useState<ResizableUseState>({
    size: new Map<string, number>(),
    order: [],
    widgets: new Map<string, React.ReactNode>(),
  })

  const DEFAULT_SIZE_INDEX = 1
  const SIZES = [3, 5, 8, 12]

  // Allows local layout to be stored whenever there are changes
  React.useEffect(() => {
    if (resizable.order.length !== resizable.size.size) {
      let seen = new Set<string>()
      let nOrder: Array<string> = []
      resizable.order.map((value) => {
        if (!seen.has(value)) {
          seen.add(value)
          nOrder.push(value)
        }
      })

      setResizable({
        ...resizable,
        order: nOrder,
      })
    }
  }, [resizable.size, resizable.order])

  /**
   * @param key adds a new widget to be rendered by key
   */
  function addItem(key: string) {
    // Create a duplicate of the current state.
    let size = new Map<string, number>(resizable.size)
    let widgets = new Map<string, React.ReactNode>(resizable.widgets)
    let order: Array<string> = Array.from(resizable.order)

    // Add the new widget to the bottom of the page w/ default size.
    size.set(key, DEFAULT_SIZE_INDEX)
    widgets.set(key, <Widget key={key} widget={{ key: key }} />)
    order.push(key)

    // Store the changes.
    setResizable({
      size: size,
      order: order,
      widgets: widgets,
    })
  }

  function getWidget(key: string) {
    return resizable.widgets.get(key)
  }

  function createKey(type: WidgetType, uid: string) {
    return `${type}:${uid}`
  }

  /**
   * Handles reading the layout from the database.
   */
  function readLayout(layout: Array<StoredLocation>) {
    let size = new Map<string, number>()
    let widgets = new Map<string, React.ReactNode>()
    let order: Array<string> = []

    layout.map((item) => {
      size.set(item.key, item.size)
      order.push(item.key)
      widgets.set(item.key, <Widget key={item.key} widget={{ key: item.key }} />)
    })

    setResizable({
      size: size,
      order: order,
      widgets: widgets,
    })
  }

  /**
   * Creates an array that represents the state of the current layout so it can be stored locally and later in the database.
   */
  function getStorableLayout(order: Array<string>) {
    let layout: Array<StoredLocation> = []

    resizable.order.map((key) => {
      layout.push({
        key: key,
        size: resizable.size.get(key) ?? 0,
      })
    })

    return layout
  }

  // TODO: Have function to add widgets
  function handleItemUpdate(dashboardItem: Array<string>) {
    let map = new Map(resizable?.size)

    dashboardItem.forEach((item) => {
      if (!map.has(item)) {
        map.set(item, 1)
      }
    })

    setResizable({
      ...resizable,
      size: map,
    })
  }

  function canIncreaseSize(key: string) {
    let size = resizable.size.get(key)
    if (size === undefined) {
      return false
    }
    return size + 1 < SIZES.length
  }

  function canDecreaseSize(key: string) {
    let size = resizable.size.get(key)
    if (size === undefined) {
      return false
    }
    return size > 0
  }

  /**
   * If possible, increase the size of the widget
   */
  function doIncreaseSize(key: string) {
    if (canIncreaseSize(key)) {
      let oldSize = resizable.size.get(key) ?? 0

      let map = new Map(resizable.size)
      map.set(key, oldSize + 1)
      setResizable({
        ...resizable,
        size: map,
      })
    }
  }

  /**
   * If possible, decrease the size of the widget
   */
  function doDecreaseSize(key: string) {
    if (canDecreaseSize(key)) {
      let oldSize = resizable.size.get(key) ?? SIZES.length
      let map = new Map(resizable.size)
      map.set(key, oldSize - 1)
      setResizable({
        ...resizable,
        size: map,
      })
    }
  }

  function getSize(key: string) {
    let sizeIndex = resizable.size.get(key) ?? 0
    return SIZES[sizeIndex]
  }

  function moveArray(oldIndex: number, newIndex: number) {
    let a: Array<string> = []
    for (let i = 0; i < resizable.order.length; i++) {
      if (i === newIndex) {
        if (oldIndex < newIndex) {
          a.push(resizable.order[i])
          a.push(resizable.order[oldIndex])
        }
        if (oldIndex > newIndex) {
          a.push(resizable.order[oldIndex])
          a.push(resizable.order[i])
        } else {
          a.push(resizable.order[i])
        }
      } else if (i !== oldIndex) {
        a.push(resizable.order[i])
      }
    }
    return a
  }

  function onSortEnd({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) {
    setResizable({
      ...resizable,
      order: moveArray(oldIndex, newIndex),
    })
  }

  return (
    <ResizableContext.Provider
      value={{
        doIncreaseSize,
        doDecreaseSize,
        getSize,
        createKey,
        handleItemUpdate,
        readLayout,
        resizable,
        onSortEnd,
        getWidget,
        addItem,
        canDecreaseSize,
        canIncreaseSize,
        getStorableLayout,
      }}
    >
      {children}
    </ResizableContext.Provider>
  )
}
