import { WbSunny } from "@mui/icons-material"
import React, { useTransition } from "react"
import Day from "../../components/Dashboard/Day"
import { Suggestions, SuggestionWidgets } from "../../components/Dashboard/Widgets/Suggestions"
import { Widget } from "../types/dashboard"
import { SuggestionWidget } from "../types/trip"
import { useTrip } from "./trip"
export default function useWidget(w: Widget) {
  const sizes = [3, 6, 12]
  const [widget, setWidget] = React.useState<Widget>(w)
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
      console.log("day", day, trip.days, parseInt(splitKey[1]))
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
    return <></>
  }

  function getGridSize() {
    return sizes[widget.size]
  }

  return {
    getWidgetUI,
    popup,
    getGridSize,
    widget,
  }
}
