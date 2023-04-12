import React from "react"
import { ActivityPrefField } from "../../types/trip"
import { useAuth } from "../authentication"
import { useScreen } from "../screen"
import { useTrip } from "../trip"

export function useCreatePreferences() {
  const [title, updateTitle] = React.useState("")
  const [outdoorPref, updateOutdoorPref] = React.useState<ActivityPrefField>()
  const [pricePref, updatePricePref] = React.useState<ActivityPrefField>()
  const { createActivityWidget } = useTrip()
  const { user } = useAuth()
  const { updateErrorToast } = useScreen()

  async function createPrefrencesWidget(callback: (isSuccess: boolean) => void) {
    if (user === undefined) {
      updateErrorToast("Must be logged in.")
      return
    }
    if (outdoorPref === undefined) {
      updateErrorToast("Must choose an outdoor preference.")
      return
    }

    if (pricePref === undefined) {
      updateErrorToast("Must choose a price preference.")
      return
    }

    const widget = {
      title: title,
      sports: outdoorPref === "SPORTS" ? [user.uid] : [],
      nature: outdoorPref === "NATURE" ? [user.uid] : [],
      sightseeing: outdoorPref === "SIGHTSEEING" ? [user.uid] : [],
      lowPrice: pricePref === "LOWPRICE" ? [user.uid] : [],
      medPrice: pricePref === "MEDPRICE" ? [user.uid] : [],
      highPrice: pricePref === "HIGHPRICE" ? [user.uid] : [],
      veryHighPrice: pricePref === "VERYHIGHPRICE" ? [user.uid] : [],
    }

    await createActivityWidget(widget, (isSuccess) => {
      callback(isSuccess)
      return
    })
  }
  return {
    title,
    updateTitle,
    outdoorPref,
    updateOutdoorPref,
    pricePref,
    updatePricePref,
    createPrefrencesWidget,
  }
}
