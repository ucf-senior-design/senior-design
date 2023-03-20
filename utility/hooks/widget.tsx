import { WbSunny } from "@mui/icons-material"
import React, { useTransition } from "react"
import Day from "../../components/Dashboard/Day"
import Poll from "../../components/Dashboard/Widgets/Poll/Poll"
import { Suggestions } from "../../components/Dashboard/Widgets/Suggestions"
import { Widget } from "../types/trip"
import { SuggestionWidget } from "../types/trip"
import { useTrip } from "./trip"
export default function useWidget(w: Widget) {
  const [popup, setPopup] = React.useState(false)
  const { trip } = useTrip()

  function getWidgetUI(): React.ReactNode {
    let splitKey = w.key.split(":")
    if (splitKey[0] === "suggestion") {
      return (
        <Suggestions
          tripID={trip.uid}
          suggestionWidget={trip.suggestions.get(splitKey[1]) as SuggestionWidget}
        />
      )
    }
    if (splitKey[0] === "day") {
      let day = trip.days[parseInt(splitKey[1])]
      return (
        <Day
          day={new Date(day.date)}
          events={day.itinerary}
          joinableEvents={day.joinable}
          weatherIcon={<WbSunny />}
          temperature={30}
        />
      )
    }

    if (splitKey[0] === "poll") {
      return <Poll poll={trip.polls.get(splitKey[1]) as any} showResults={false} />
    }
    return <></>
  }

  return {
    getWidgetUI,
    popup,
    setPopup,
  }
}
