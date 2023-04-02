import React from "react"
import { Event, Event as EventType } from "../../types/trip"
import { useAuth } from "../authentication"
import { useScreen } from "../screen"
import { useTrip } from "../trip"

export type useModifyEventHook = {
  modifiedEvent: EventType
  modify: (callback: (isSuccess: boolean) => void) => Promise<void>
  updateTitle: (title: string) => void
  updateDuration: (startDate: Date, endDate: Date) => void
  updateDescription: (description: string) => void
  updateLocation: (location: string) => void
}

export default function useModifyEvent(originalEvent: Event): useModifyEventHook {
  const { updateErrorToast } = useScreen()
  const { user } = useAuth()
  const { modifyEvent } = useTrip()

  const [modifiedEvent, setModifiedEvent] = React.useState<EventType>(originalEvent)

  function updateLocation(location: string) {
    setModifiedEvent({
      ...modifiedEvent,
      location: location,
    })
  }

  function updateTitle(title: string) {
    setModifiedEvent({
      ...modifiedEvent,
      title: title,
    })
  }
  function updateDuration(startDate: Date, endDate: Date) {
    setModifiedEvent({
      ...modifiedEvent,
      duration: {
        start: new Date(startDate),
        end: new Date(endDate),
      },
    })
  }

  function updateDescription(description: string) {
    setModifiedEvent({
      ...modifiedEvent,
      description: description,
    })
  }

  async function modify(callback: (isSuccess: boolean) => void) {
    if (user === undefined) {
      updateErrorToast("Please try again later.")
      return
    }

    if (modifiedEvent.title === undefined) {
      updateErrorToast("Please enter a title.")
    }
    if (modifiedEvent.duration === undefined) {
      updateErrorToast("Please select a duration.")
    }
    if (modifiedEvent.location === undefined) {
      updateErrorToast("Please enter a location.")
    }

    if (user === undefined) {
      updateErrorToast("Please try again later.")
      return
    }
    await modifyEvent(
      {
        title: modifiedEvent.title,
        description: modifiedEvent.description,
        duration: modifiedEvent.duration,
        location: modifiedEvent.location,
        uid: modifiedEvent.uid,
      },
      (isSuccess) => {
        callback(isSuccess)
      },
    )
  }

  return {
    modifiedEvent,
    modify,
    updateTitle,
    updateDuration,
    updateDescription,
    updateLocation,
  }
}
