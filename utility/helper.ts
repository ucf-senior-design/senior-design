import createTrip, { AttendeeOption } from "./hooks/create/createTrip"

export function getTime(date: Date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

export function createFriendPairing(user1: string, user2: string) {
  if (user1.localeCompare(user2) < 0) {
    return `${user1}:${user2}`
  }
  return `${user2}:${user1}`
}

export function getFriendPairing(pairing: string) {
  let users = pairing.split(":")
  return users
}

export function getAttendeeOptionsArray(list: Set<AttendeeOption>) {
  let tAttendees: Array<AttendeeOption> = []
  list.forEach((a) => {
    tAttendees.push(a)
  })
  return tAttendees
}

export function createAttendeesArray(attendees: Array<AttendeeOption>) {
  let tAttendees: Array<string> = []
  attendees.forEach((a) => {
    if (a.type === "team") {
      // TODO Get all the people in the team
      tAttendees.push(a.uid)
    } else {
      tAttendees.push(a.uid)
    }
  })
  return tAttendees
}
