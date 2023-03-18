import React from "react"
import { createAttendeesArray, getAttendeeOptionsArray } from "../../helper"
import { CreatedEvent } from "../../types/trip"
import { useAuth } from "../authentication"
import { useScreen } from "../screen"
import { useTrip } from "../trip"
import { AttendeeOption } from "./createTrip"

export default function useCreateEvent() {
  const { updateErrorToast } = useScreen()
  const { user } = useAuth()
  const { createEvent } = useTrip()

  interface TCreateEvent extends Omit<CreatedEvent, "attendees"> {
    attendees: Array<AttendeeOption>
    attendeeOptions: Array<AttendeeOption>
  }
  const EMPTY_EVENT: TCreateEvent = {
    title: "",
    attendees: [],
    duration: { start: new Date(), end: new Date() },
    location: "",
    description: "",
    attendeeOptions: [],
  }
  const [event, setEvent] = React.useState<TCreateEvent>(EMPTY_EVENT)

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

  function updateStart(startDate: Date) {
    setEvent({
      ...event,
      duration: {
        start: startDate,
        end: new Date(Math.max(startDate.getTime(), event.duration.end.getTime())),
      },
    })
  }

  function updateEnd(endDate: Date) {
    setEvent({
      ...event,
      duration: {
        start: new Date(Math.min(endDate.getTime(), event.duration.start.getTime())),
        end: endDate,
      },
    })
  }

  function updateDescription(description: string) {
    setEvent({
      ...event,
      description: description,
    })
  }

  function updateAttendees(attendees: Array<AttendeeOption>) {
    setEvent({
      ...event,
      attendees: getAttendeeOptionsArray(new Set(attendees)),
    })
  }

  async function create() {
    if (user === undefined) {
      updateErrorToast("Please try again later.")
      return
    }

    let attendees = createAttendeesArray(event.attendees)
    attendees.push(user.uid)

    await createEvent(
      {
        title: event.title,
        description: event.description,
        duration: event.duration,
        location: event.location,
        attendees: attendees,
      },
      (isSuccess) => {
        if (isSuccess) {
        } else {
          updateErrorToast("Cannot create event.")
        }
      },
    )
  }

  return {
    event,
    create,
    updateTitle,
    updateStart,
    updateEnd,
    updateAttendees,
    updateDescription,
    updateLocation,
  }
}
