import { WbSunny } from "@mui/icons-material"
import React from "react"
import Day from "../../components/Dashboard/Day"
import Poll from "../../components/Dashboard/Widgets/Poll/Poll"
import { Suggestions } from "../../components/Dashboard/Widgets/Suggestions"
import WeatherWidget from "../../components/Dashboard/Widgets/WeatherWidget"
import { SuggestionWidget, Widget, WidgetType } from "../types/trip"
import { useScreen } from "./screen"
import { useTrip } from "./trip"
export default function useWidget(w: Widget) {
  const [popup, setPopup] = React.useState(false)
  const {
    trip,
    deleteActivityWidget,
    deleteAvailabillityWidget,
    deletePoll,
    deleteSuggestion,
    deleteWeather,
  } = useTrip()
  const { updateErrorToast } = useScreen()

  function handleDeleteStatus(isSuccess: boolean) {
    if (!isSuccess) {
      updateErrorToast("error deleting widget.")
    }
  }
  async function deleteWidget(uid: string, type: WidgetType) {
    if (type === "availabillity") {
      await deleteAvailabillityWidget(uid, (isSuccess) => {
        handleDeleteStatus(isSuccess)
      })
      return
    }

    if (type === "preference") {
      await deleteActivityWidget(uid, (isSuccess) => {
        handleDeleteStatus(isSuccess)
      })
      return
    }

    if (type === "poll") {
      await deletePoll(uid, (isSuccess) => {
        handleDeleteStatus(isSuccess)
      })
      return
    }

    if (type === "suggestion") {
      await deleteSuggestion(uid, (isSuccess) => {
        handleDeleteStatus(isSuccess)
      })
      return
    }

    if (type === "weather") {
      await deleteWeather(uid, (isSuccess) => {
        handleDeleteStatus(isSuccess)
      })
      return
    }

    updateErrorToast("Cannot delete at this time.")
  }
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
    deleteWidget,
  }
}
