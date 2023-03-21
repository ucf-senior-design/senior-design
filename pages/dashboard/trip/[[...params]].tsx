import { useRouter } from "next/router"
import React from "react"
import { EventReschedule } from "../../../components/Dashboard/EventReschedule"
import Schedule from "../../../components/Dashboard/Schedule"
import { CalendarWidget } from "../../../components/Dashboard/Widgets/Calendar"
import { PreferencesWidget } from "../../../components/Dashboard/Widgets/Preferences"
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
      <div style={{ height: "250px" }}>{/* <TripHeader /> */}</div>,
    )
  }, [router])

  return tripID !== undefined ? (
    <TripProvider id={tripID}>
      <SuggestionWidgets />
      <PreferencesWidget />
      <CalendarWidget />
      <Schedule />
      <EventReschedule />
    </TripProvider>
  ) : (
    <div> loading</div>
  )
}
