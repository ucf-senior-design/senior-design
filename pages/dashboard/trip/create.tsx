import React from "react"
import { FriendProvider } from "../../../utility/hooks/friends"
import CreateTripForm from "../../../components/Create/CreateTripForm"

export default function CreateTrip() {
  return (
    <FriendProvider>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CreateTripForm />
      </div>
    </FriendProvider>
  )
}
