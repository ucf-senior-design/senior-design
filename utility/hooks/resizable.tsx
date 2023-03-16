import React from "react"
interface Resizable {
  doIncreaseSize: (key: string) => void
  doDecreaseSize: (key: string) => void
  getSize: (key: string) => number
  handleItemUpdate: (dashboardItem: Array<string>) => void
}

const ResizableContext = React.createContext<Resizable | null>(null)

export function useResizable() {
  const context = React.useContext(ResizableContext)

  if (!context) {
    throw Error("useDashboardContent must be used within an AuthProvider")
  }
  return context
}

export function ResizableProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<Map<string, number>>()
  const sizes = [3, 6, 12]

  React.useEffect(() => {
    handleItemUpdate([
      "suggestion:5SIaabTavwsmKGPrfTGy",
      "suggestion:6iTldrtHhzzysFMhOgRM",
      "suggestion:F5UkHGJPJtCNNM3c0nIv",
      "day:0",
    ])
  }, [])

  function handleItemUpdate(dashboardItem: Array<string>) {
    let map = new Map(items)
    dashboardItem.forEach((item) => {
      if (!map.has(item)) {
        map.set(item, 1)
      }
    })

    setItems(map)
  }

  function canIncreaseSize(key: string) {
    console.log(items, items?.get(key))
    let size = items?.get(key)
    if (size === undefined) {
      return false
    }
    return size + 1 < sizes.length
  }

  function canDecreaseSize(key: string) {
    let size = items?.get(key)
    if (size === undefined) {
      return false
    }
    return size > 0
  }

  function doIncreaseSize(key: string) {
    console.log(key)
    if (canIncreaseSize(key)) {
      let oldSize = items?.get(key) ?? 0
      console.log(oldSize)
      let map = new Map(items)
      map.set(key, oldSize + 1)
      setItems(map)
    }
  }

  function doDecreaseSize(key: string) {
    if (canDecreaseSize(key)) {
      let oldSize = items?.get(key) ?? sizes.length
      let map = new Map(items)
      map.set(key, oldSize - 1)
      setItems(map)
    }
  }

  function getSize(key: string) {
    let sizeIndex = items?.get(key) ?? 0
    return sizes[sizeIndex]
  }

  return (
    <ResizableContext.Provider
      value={{ doIncreaseSize, doDecreaseSize, getSize, handleItemUpdate }}
    >
      {children}
    </ResizableContext.Provider>
  )
}
