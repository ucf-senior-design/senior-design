import React from "react"
import { Event, Trip } from "../../types/trip"
import { useAuth } from "../authentication"
import { useScreen } from "../screen"
import { useTrip } from "../trip"

export default function useModifyEvent(trip: Trip, originalEvent: Event) {
  const { updateErrorToast } = useScreen()
  const { user } = useAuth()
  const { modifyEvent } = useTrip()

  const [event, setEvent] = React.useState<Event>(originalEvent)

  function updateLocation(location: string) {
    setEvent({
      ...event,
      location: location,
    })
  }

  function updateTitle(title: string) {
    setEvent({
      ...event,
      title: title,
    })
  }
  function updateDuration(startDate: Date, endDate: Date) {
    setEvent({
      ...event,
      duration: {
        start: new Date(startDate),
        end: new Date(endDate),
      },
    })
  }

  function updateDescription(description: string) {
    setEvent({
      ...event,
      description: description,
    })
  }

  async function modify(callback: (isSuccess: boolean) => void) {
    if (user === undefined) {
      updateErrorToast("Please try again later.")
      return
    }

    if (event.title === undefined) {
      updateErrorToast("Please enter a title.")
    }
    if (event.duration === undefined) {
      updateErrorToast("Please select a duration.")
    }
    if (event.location === undefined) {
      updateErrorToast("Please enter a location.")
    }

    // const options = createFetchRequestOptions(
    //   JSON.stringify({
    //     title: event.title,
    //     description: event.description,
    //     duration: event.duration,
    //     location: event.location,
    //     attendees: originalEvent.attendees,
    //   }),
    //   "PUT",
    // )
    if (user === undefined) {
      updateErrorToast("Please try again later.")
      return
    }
    //const response = await fetch(`${API_URL}/trip/${trip.uid}/info/${originalEvent.uid}`, options)
    // console.log(options.body)
    // console.log(response)

    await modifyEvent(
      {
        title: event.title,
        description: event.description,
        duration: event.duration,
        location: event.location,
        attendees: originalEvent.attendees,
      },
      event.uid,
      (isSuccess) => {
        callback(isSuccess)
      },
    )
  }

  return {
    event,
    modify,
    updateTitle,
    updateDuration,
    updateDescription,
    updateLocation,
  }
}
