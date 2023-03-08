import { useRouter } from "next/router"
import React from "react"
import Schedule from "../../../components/Dashboard/Schedule"
import { TripHeader } from "../../../components/Dashboard/TripHeader"
import { SuggestionWidgets } from "../../../components/Dashboard/Widgets/Suggestions"
import { useScreen } from "../../../utility/hooks/screen"
import { TripProvider } from "../../../utility/hooks/trip"

export default function Trip() {
  const router = useRouter()
  const [tripID, setTripID] = React.useState<string | undefined>(undefined)
  const { updateNav } = useScreen()

  React.useEffect(() => {
    const { id } = router.query
    setTripID(id as string | undefined)
    updateNav(
      { background: "url('/header.svg') 100% 100%" },
      "transparent",
      <div style={{ height: "250px" }}>
        <TripHeader />
      </div>,
    )
  }, [router])

  return tripID !== undefined ? (
    <TripProvider id={tripID}>
      <SuggestionWidgets />
      <Schedule />
    </TripProvider>
  ) : (
    <div> loading</div>
  )
}
