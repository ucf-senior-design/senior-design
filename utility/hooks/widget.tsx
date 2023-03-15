import React, { useTransition } from "react"
import { Suggestions, SuggestionWidgets } from "../../components/Dashboard/Widgets/Suggestions"
import { Widget } from "../types/dashboard"
import { SuggestionWidget } from "../types/trip"
import { useTrip } from "./trip"
export default function useWidget(w: Widget) {
  const sizes = [3, 6, 12]
  const [widget, setWidget] = React.useState<Widget>(w)
  const [popup, setPopup] = React.useState(false)
  const { trip } = useTrip()

  function canIncreaseSize() {
    return widget.size + 1 < sizes.length
  }

  function canDecreaseSize() {
    return widget.size > 0
  }

  function showPopUp() {
    setPopup(true)
  }

  function hidePopUp() {
    setPopup(false)
  }

  function doIncreaseSize() {
    console.log(widget.size, canIncreaseSize())
    if (canIncreaseSize())
      setWidget({
        ...widget,
        size: widget.size + 1,
      })
  }

  function doDecreaseSize() {
    console.log(w.size, canDecreaseSize())
    if (canDecreaseSize())
      setWidget({
        ...widget,
        size: widget.size - 1,
      })
  }

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
    return <></>
  }

  function getGridSize() {
    return sizes[widget.size]
  }

  return {
    canIncreaseSize,
    canDecreaseSize,
    doIncreaseSize,
    doDecreaseSize,
    getWidgetUI,
    popup,
    showPopUp,
    hidePopUp,
    getGridSize,
    widget,
  }
}
