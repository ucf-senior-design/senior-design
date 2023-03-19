import { useRouter } from "next/router"
import React from "react"
import Schedule from "../../../components/Dashboard/Schedule"
import { SuggestionWidgets } from "../../../components/Dashboard/Widgets/Suggestions"
import type { MenuProps } from "antd"
import { TripProvider } from "../../../utility/hooks/trip"
import { useScreen } from "../../../utility/hooks/screen"
import { ResizableProvider } from "../../../utility/hooks/resizable"
import Content from "../../../components/Dashboard/Content"
import { Box, Button, Popover } from "@mui/material"
import CreateEvent from "../../../components/Create/CreateEvent"
import { BackdropModal } from "../../../components/BackdropModal"
import { Add } from "@mui/icons-material"
import { Dropdown, Button as AButton } from "antd"
import CreatePoll from "../../../components/Create/CreatePoll"

export default function Trip() {
  const router = useRouter()
  const [tripID, setTripID] = React.useState<string | undefined>(undefined)

  // Handle showing the create popups for different wigets
  const [showCreateEvent, setShowCreateEvent] = React.useState(false)
  const [showCreatePoll, setShowCreatePoll] = React.useState(true)
  const [showCreateSuggestion, setShowCreateSuggestion] = React.useState(false)

  // For each create popup add an item to the menu
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <a onClick={() => setShowCreateEvent(true)}> Create Event </a>,
    },
    {
      key: "2",
      label: <a onClick={() => setShowCreatePoll(true)}> Create Poll </a>,
    },
    {
      key: "3",
      label: <a onClick={() => setShowCreateSuggestion(true)}> Create Suggestion </a>,
    },
  ]
  const { updateNav } = useScreen()

  React.useEffect(() => {
    const { id } = router.query
    setTripID(id as string | undefined)
  }, [router])

  return tripID !== undefined ? (
    <ResizableProvider>
      <TripProvider id={tripID}>
        <Dropdown menu={{ items }} placement="topRight">
          <AButton style={$addButton}>
            <Add sx={{ color: "white" }} />
          </AButton>
        </Dropdown>

        <div style={$popUpDiv}>
          <BackdropModal
            isOpen={showCreateEvent}
            toggleShow={() => setShowCreateEvent(!showCreateEvent)}
          >
            <CreateEvent closeModal={() => setShowCreateEvent(false)} />
          </BackdropModal>
        </div>

        <div style={$popUpDiv}>
          <BackdropModal
            isOpen={showCreatePoll}
            toggleShow={() => setShowCreatePoll(!showCreatePoll)}
          >
            <CreatePoll closeModal={() => setShowCreatePoll(false)} />
          </BackdropModal>
        </div>

        <div style={$popUpDiv}>
          <BackdropModal
            isOpen={showCreateSuggestion}
            toggleShow={() => setShowCreateSuggestion(!showCreateSuggestion)}
          >
            <CreatePoll closeModal={() => setShowCreateSuggestion(false)} />
          </BackdropModal>
        </div>
        <Content />
      </TripProvider>
    </ResizableProvider>
  ) : (
    <div> loading</div>
  )
}

const $popUpDiv: React.CSSProperties = {
  position: "absolute",
  zIndex: 2,
}

const $addButton: React.CSSProperties = {
  height: "60px",
  width: "60px",
  backgroundColor: "#3F3D56",
  position: "fixed",
  bottom: "20px",
  left: "20px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
  boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
}
