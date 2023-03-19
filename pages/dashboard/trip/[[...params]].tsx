import { useRouter } from "next/router"
import React from "react"
import Schedule from "../../../components/Dashboard/Schedule"
import { SuggestionWidgets } from "../../../components/Dashboard/Widgets/Suggestions"
import { TripProvider } from "../../../utility/hooks/trip"
import { useScreen } from "../../../utility/hooks/screen"
import { ResizableProvider } from "../../../utility/hooks/resizable"
import Content from "../../../components/Dashboard/Content"
import { Box, Button } from "@mui/material"
import CreateEvent from "../../../components/Create/CreateEvent"
import { BackdropModal } from "../../../components/BackdropModal"

export default function Trip() {
  const router = useRouter()
  const [tripID, setTripID] = React.useState<string | undefined>(undefined)
  const [showCreateEvent, setShowCreateEvent] = React.useState(false)
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
        <Button onClick={() => setShowCreateEvent(true)}> Create Event </Button>
        <div style={{ position: "absolute", zIndex: 2 }}>
          <BackdropModal
            isOpen={showCreateEvent}
            toggleShow={() => setShowCreateEvent(!showCreateEvent)}
          >
            <CreateEvent closeModal={() => setShowCreateEvent(false)} />
          </BackdropModal>
        </div>
        <Content />
      </TripProvider>
    </ResizableProvider>
  ) : (
    <div> loading</div>
  )
}
