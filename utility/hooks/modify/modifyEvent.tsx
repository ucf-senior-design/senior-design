import React from "react"
import { createAttendeesArray, getAttendeeOptionsArray } from "../../helper"
import { CreatedEvent, Event } from "../../types/trip"
import { useAuth } from "../authentication"
import { AttendeeOption } from "../create/createTrip"
import { useScreen } from "../screen"
import { useTrip } from "../trip"

export default function useModifyEvent(originalEvent: Event) {
  const { updateErrorToast } = useScreen()
  const { user } = useAuth()
  const { modifyEvent, trip } = useTrip()
  

  interface TModifyEvent extends Omit<CreatedEvent, "attendees"> {
    attendees: Array<AttendeeOption>
    attendeeOptions: Array<AttendeeOption>
  }

  const [event, setEvent] = React.useState<TModifyEvent>({
    title: originalEvent.title,
    attendees: [],
    duration: originalEvent.duration,
    location: originalEvent.location,
    description: originalEvent.description,
    attendeeOptions: [],
  })

 
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

  function updateAttendees(attendees: Array<AttendeeOption>) {
    setEvent({
      ...event,
      attendees: getAttendeeOptionsArray(new Set(attendees)),
    })
  }

  function addAttendeeOption(type: "person" | "team", uid: string, name: string) {
    let newOptions = new Set(event.attendeeOptions)
    let newAttendees = new Set(event.attendees)
    let attendee: AttendeeOption = {
      type: type,
      uid: uid,
      name: name,
    }

    newOptions.add(attendee)
    newAttendees.add(attendee)

    setEvent({
      ...event,
      attendees: getAttendeeOptionsArray(newAttendees),
      attendeeOptions: getAttendeeOptionsArray(newOptions),
    })
  }
  async function modify(callback: (isSuccess: boolean) => void) {
    if (user === undefined) {
      updateErrorToast("Please try again later.")
      return
    }

    let attendees = createAttendeesArray(event.attendees)
    attendees.push(user.uid)

    await modifyEvent(
      {
        title: event.title,
        description: event.description,
        duration: event.duration,
        location: event.location,
        attendees: attendees,
      },
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
    updateAttendees,
    updateDescription,
    updateLocation,
    addAttendeeOption,
  }
}
