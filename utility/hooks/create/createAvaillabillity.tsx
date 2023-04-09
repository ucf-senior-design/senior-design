import React from "react"
import { callbackify } from "util"
import { Duration } from "../../types/trip"
import { useAuth } from "../authentication"
import { useScreen } from "../screen"
import { useTrip } from "../trip"

export function useCreateAvailabilityWidget() {
  const [localDuration, updateLocalDuration] = React.useState<Duration>({
    start: new Date(),
    end: new Date(),
  })
  const [durations, setDurations] = React.useState<Array<Duration>>([])
  const [title, updateTitle] = React.useState<string>()
  const { user } = useAuth()
  const { createAvailabillityWidget } = useTrip()
  const { updateErrorToast } = useScreen()
  function addDuration() {
    let d = Array.from(durations)
    d.push(localDuration)
    setDurations(d)
  }

  function createChipLabel(duration: Duration) {
    return `${duration.start.toDateString()} - ${duration.end.toDateString()}`
  }
  function removeDuration(index: number) {
    let d: Array<Duration> = []

    durations.forEach((duration, i) => {
      if (index !== index) {
        d.push(duration)
      }
    })

    setDurations(Array.from(new Set(d)))
  }

  async function maybeCreate(callback: (isSuccess: boolean) => void) {
    if (user === undefined) {
      updateErrorToast("Please try again later.")
      return
    }

    if (durations.length === 0) {
      updateErrorToast("Please add some availabilities.")
      return
    }

    if (title === undefined) {
      updateErrorToast("Must have a title.")
      return
    }

    await createAvailabillityWidget(
      {
        title: title,
        dates: durations,
      },
      (isSuccess) => {
        callback(isSuccess)
      },
    )
  }
  return {
    updateTitle,
    durations,
    title,
    addDuration,
    removeDuration,
    maybeCreate,
    createChipLabel,
    localDuration,
    updateLocalDuration,
  }
}
