import { WbSunny } from "@mui/icons-material"
import React from "react"
import Day from "../../components/Dashboard/Day"
import Poll from "../../components/Dashboard/Widgets/Poll/Poll"
import { Suggestions } from "../../components/Dashboard/Widgets/Suggestions"
import WeatherWidget from "../../components/Dashboard/Widgets/WeatherWidget"
import { SuggestionWidget, Widget, WidgetType } from "../types/trip"
import { useTrip } from "./trip"
export default function useWidget(w: Widget) {
  const [popup, setPopup] = React.useState(false)
  const { trip } = useTrip()

  function getWidgetUI(): React.ReactNode {
    let splitKey = w.key.split(":")
    let widgetType: WidgetType = splitKey[0] as any
    if (splitKey[0] === "suggestion") {
      return (
        <Suggestions
          tripID={trip.uid}
          suggestionWidget={trip.suggestions.get(splitKey[1]) as SuggestionWidget}
        />
      )
    }
    if (widgetType === "day") {
      let day = trip.days[parseInt(splitKey[1])]
      return <Day day={new Date(day.date)} events={day.itinerary} joinableEvents={day.joinable} />
    }

    if (widgetType === "poll") {
      return <Poll poll={trip.polls.get(splitKey[1]) as any} showResults={false} />
    }

    if (widgetType === "weather") {
      return <WeatherWidget />
    }

    if (widgetType === "preference") {
      return <div> preference widget </div>
    }

    if (widgetType === "availabillity") {
      return <div> availabillity widget</div>
    }

    return <></>
  }

  return {
    getWidgetUI,
    popup,
    setPopup,
  }
}
