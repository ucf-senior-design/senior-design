import { Add } from "@mui/icons-material"
import type { MenuProps } from "antd"
import { Button as AButton, Dropdown } from "antd"
import { useRouter } from "next/router"
import React from "react"
import { BackdropModal } from "../../../components/BackdropModal"
import CreateEvent from "../../../components/Create/CreateEvent"
import CreatePoll from "../../../components/Create/CreatePoll"
import CreateSuggestion from "../../../components/Create/CreateSuggestion"
import Content from "../../../components/Dashboard/Content"
import { FriendProvider } from "../../../utility/hooks/friends"
import { ResizableProvider } from "../../../utility/hooks/resizable"
import { useScreen } from "../../../utility/hooks/screen"
import { TripProvider } from "../../../utility/hooks/trip"

export default function Trip() {
  const { updateNav } = useScreen()
  const router = useRouter()
  // Handle showing the create popups for different wigets
  const [showCreateEvent, setShowCreateEvent] = React.useState(false)
  const [showCreatePoll, setShowCreatePoll] = React.useState(false)
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

  return (
    <ResizableProvider>
      <FriendProvider>
        <TripProvider>
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
              <CreateSuggestion closeModal={() => setShowCreateSuggestion(false)} />
            </BackdropModal>
          </div>
          <Content />
        </TripProvider>
      </FriendProvider>
    </ResizableProvider>
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
