import React from "react"
import { createAttendeesArray, getAttendeeOptionsArray } from "../../helper"
import { CreatedEvent } from "../../types/trip"
import { useAuth } from "../authentication"
import { useFriend } from "../friends"
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

  const { friendList, addFriendOptions } = useFriend()
  const { trip } = useTrip()
  const EMPTY_EVENT: TCreateEvent = {
    title: "",
    attendees: [],
    duration: { start: trip.duration.start, end: trip.duration.start },
    location: "",
    description: "",
    attendeeOptions: [],
  }
  const [event, setEvent] = React.useState<TCreateEvent>(EMPTY_EVENT)
  React.useEffect(() => {
    let friends = addFriendOptions()
    let updatedOptions = Array.from(event.attendeeOptions)

    event.attendeeOptions.forEach((option) => {
      if (friends.has(option.uid)) {
        friends.delete(option.uid)
      }
    })

    friends.forEach((friend) => {
      updatedOptions.push(friend)
    })

    setEvent({
      ...event,
      attendeeOptions: updatedOptions,
    })
  }, [friendList])

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
  async function create(callback: (isSuccess: boolean) => void) {
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
        callback(isSuccess)
      },
    )
  }

  return {
    event,
    create,
    updateTitle,
    updateDuration,
    updateAttendees,
    updateDescription,
    updateLocation,
    addAttendeeOption,
  }
}
