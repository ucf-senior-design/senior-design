import { Add } from "@mui/icons-material"
import type { MenuProps } from "antd"
import { Button as AButton, Dropdown } from "antd"
import React from "react"
import { BackdropModal } from "../../../components/BackdropModal"
import CreateAvailabillity from "../../../components/Create/CreateAvaillabillity"
import CreateEvent from "../../../components/Create/CreateEvent"
import CreatePhotodump from "../../../components/Create/CreatePhotoDump"
import CreatePoll from "../../../components/Create/CreatePoll"
import CreatePreferences from "../../../components/Create/CreatePreferences"
import CreateSuggestion from "../../../components/Create/CreateSuggestion"
import CreateWeather from "../../../components/Create/CreateWeather"
import Content from "../../../components/Dashboard/Content"
import { TripHeader } from "../../../components/Dashboard/TripHeader"
import ModifyTrip from "../../../components/Modify/ModifyTrip"
import { FriendProvider } from "../../../utility/hooks/friends"
import { ResizableProvider } from "../../../utility/hooks/resizable"
import { TripProvider } from "../../../utility/hooks/trip"

export default function Trip() {
  // Handle showing the create popups for different wigets
  const [showCreateEvent, setShowCreateEvent] = React.useState(false)
  const [showCreatePoll, setShowCreatePoll] = React.useState(false)
  const [showCreateSuggestion, setShowCreateSuggestion] = React.useState(false)
  const [showModifyTrip, setShowModifyTrip] = React.useState(false)
  const [showCreateWeather, setShowCreateWeather] = React.useState(false)
  const [showCreatePreference, setShowCreatePreference] = React.useState(false)
  const [showCreateAvaillabillity, setShowCreateAvailabillity] = React.useState(false)
  const [showCreatePhotodump, setShowCreatePhotodump] = React.useState(false)

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
      label: <a onClick={() => setShowCreateSuggestion(true)}> Create Suggestion Widget </a>,
    },

    {
      key: "4",
      label: <a onClick={() => setShowCreateWeather(true)}> Show Weather </a>,
    },
    {
      key: "5",
      label: <a onClick={() => setShowCreatePreference(true)}> Create Prefrence Widget</a>,
    },
    {
      key: "6",
      label: <a onClick={() => setShowCreateAvailabillity(true)}> Create Availabillity Widget</a>,
    },
    {
      key: "7",
      label: <a onClick={() => setShowCreatePhotodump(true)}> Connect to Google Photos </a>,
    },
  ]

  return (
    <ResizableProvider>
      <TripProvider>
        <FriendProvider>
          <TripHeader showModify={() => setShowModifyTrip(true)} />
          <Dropdown menu={{ items }} placement="topRight">
            <AButton style={$addButton}>
              <Add sx={{ color: "white" }} />
            </AButton>
          </Dropdown>
          <Dropdown menu={{ items }} placement="topRight">
            <AButton style={$addButton}>
              <Add sx={{ color: "white" }} />
            </AButton>
          </Dropdown>

          <div style={$popUpDiv}>
            <BackdropModal
              isOpen={showModifyTrip}
              toggleShow={() => setShowModifyTrip(!showModifyTrip)}
            >
              <ModifyTrip closeModal={() => setShowModifyTrip(false)} />
            </BackdropModal>
          </div>

          <div style={$popUpDiv}>
            <BackdropModal
              isOpen={showCreatePreference}
              toggleShow={() => setShowCreatePreference(!showCreatePreference)}
            >
              <CreatePreferences closeModal={() => setShowCreatePreference(false)} />
            </BackdropModal>
          </div>

          <div style={$popUpDiv}>
            <BackdropModal
              isOpen={showCreateAvaillabillity}
              toggleShow={() => setShowCreateAvailabillity(!showCreateAvaillabillity)}
            >
              <CreateAvailabillity closeModal={() => setShowCreateAvailabillity(false)} />
            </BackdropModal>
          </div>

          <div style={$popUpDiv}>
            <BackdropModal
              isOpen={showCreateEvent}
              toggleShow={() => setShowCreateEvent(!showCreateEvent)}
            >
              <FriendProvider>
                <CreateEvent closeModal={() => setShowCreateEvent(false)} />
              </FriendProvider>
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

          <div style={$popUpDiv}>
            <BackdropModal
              isOpen={showCreateWeather}
              toggleShow={() => setShowCreateWeather(!showCreateWeather)}
            >
              <CreateWeather closeModal={() => setShowCreateWeather(false)} />
            </BackdropModal>
          </div>

          <div style={$popUpDiv}>
            <BackdropModal
              isOpen={showCreatePhotodump}
              toggleShow={() => setShowCreatePhotodump(!showCreatePhotodump)}
            >
              <CreatePhotodump closeModal={() => setShowCreatePhotodump(false)} />
            </BackdropModal>
          </div>

          <Content />
        </FriendProvider>
      </TripProvider>
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
  border: "none",
  backgroundColor: "rgba(63, 61, 86, 1.0)",
  position: "fixed",
  bottom: "20px",
  left: "20px",
  zIndex: 10,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
  boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
}
