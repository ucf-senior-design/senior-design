import { useRouter } from "next/router"
import React from "react"
import Schedule from "../../../components/Dashboard/Schedule"
import { SuggestionWidgets } from "../../../components/Dashboard/Widgets/Suggestions"
import { TripProvider } from "../../../utility/hooks/trip"
import { useScreen } from "../../../utility/hooks/screen"
import { ResizableProvider } from "../../../utility/hooks/resizable"
import Content from "../../../components/Dashboard/Content"

export default function Trip() {
  const router = useRouter()
  const [tripID, setTripID] = React.useState<string | undefined>(undefined)
  const { updateNav } = useScreen()

  React.useEffect(() => {
    const { id } = router.query
    setTripID(id as string | undefined)
    updateNav(
      { backgroundColor: "red" },
      "transparent",
      <div style={{ height: "20px" }}> stuff goes here</div>,
    )
  }, [router])

  return tripID !== undefined ? (
    <ResizableProvider>
      <TripProvider id={tripID}>
        <Content />
      </TripProvider>
    </ResizableProvider>
  ) : (
    <div> loading</div>
  )
}
