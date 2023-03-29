import { ArrowBack } from "@mui/icons-material"
import { Backdrop, Button, CircularProgress } from "@mui/material"
import dayjs from "dayjs"
import { useRouter } from "next/router"
import queryString from "query-string"
import React from "react"
import { useLocalStorage } from "react-use-storage"
import { API_URL } from "../constants"
import { createFetchRequestOptions } from "../fetch"
import { User } from "../types/user"
import { Response } from "../types/helper"
import {
  CreatedEvent,
  Duration,
  Event,
  Poll,
  PollOption,
  SuggestionOption,
  SuggestionWidget,
  Trip,
  WidgetType,
} from "../types/trip"
import { useAuth } from "./authentication"
import { useResizable } from "./resizable"
import { useScreen } from "./screen"

export type Day = {
  date: Date
  itinerary: Array<Event>
  joinable: Array<Event>
}
interface TripUseState extends Trip {
  suggestions: Map<string, SuggestionWidget>
  polls: Map<string, Poll>
  joinableEvents: Array<Array<Event>>
  itinerary: Array<Array<Event>>
  destination: string
  userData: Map<string, User> | undefined
  days: Array<Day>
  didReadLayout: boolean
}

interface TripDetails {
  duration: Duration
  destination: string
}

interface TripContext {
  trip: TripUseState
  initilizeTrip: () => Promise<void>

  // handle suggestions
  createSuggestion: (
    title: string,
    options: Array<string>,
    callback: (response: Response) => void,
  ) => Promise<void>
  deleteSuggestion: (uid: string) => Promise<void>

  // handle polls
  createPoll: (
    title: string,
    options: Array<string>,
    callback: (response: Response) => void,
  ) => Promise<void>
  deletePoll: (uid: string) => Promise<void>

  // handle weather widgetcreateP
  createWeather: () => Promise<void>
  deleteWeather: (uid: string) => Promise<void>

  // handle events
  createEvent: (event: CreatedEvent, callback: (isSucess: boolean) => void) => Promise<void>
  modifyTrip: (details: TripDetails, callback: (response: Response) => void) => Promise<void>
}

const TripContext = React.createContext<TripContext>({} as TripContext)

export function useTrip(): TripContext {
  const context = React.useContext(TripContext)

  if (!context) {
    throw Error("useTrip must be used within an TripProvider")
  }
  return context
}

export function TripProvider({ children }: { children: React.ReactNode }) {
  const [id, setId] = React.useState<string>()
  const [showOverlay, setShowOverlay] = React.useState(true)
  const router = useRouter()

  const { updateNav } = useScreen()
  const { readLayout, createKey, addItem, resizable, getStorableLayout } = useResizable()
  const [trip, setTrip] = React.useState<TripUseState>({
    uid: "",
    attendees: new Set(),
    duration: {
      start: new Date(),
      end: new Date(),
    },
    layout: [],
    destination: "",
    polls: new Map<string, Poll>(),
    suggestions: new Map<string, SuggestionWidget>(),
    itinerary: [],
    joinableEvents: [],
    photoURL: "",
    userData: new Map<string, User>(),
    days: [],
    didReadLayout: false,
  })

  const { user } = useAuth()

  React.useEffect(() => {
    if (resizable.order.length !== 0) {
      storeLayout()
    }
  }, [resizable])
  React.useEffect(() => {
    if (window !== undefined && window.location !== undefined) {
      const { id } = queryString.parse(window.location.search)
      setId(id as string)
    }
    updateNav(
      { background: "url('/header.svg') 100% 100%" },
      "transparent",
      <div style={{ height: "250px" }}>
        <Button onClick={() => router.back()}>
          <ArrowBack sx={{ color: "white" }} />
        </Button>
      </div>,
    )
  }, [])

  React.useEffect(() => {
    if (trip.uid.length !== 0)
      setTrip({
        ...trip,
        days: getEventsByDay(
          trip.duration.start,
          trip.duration.end,
          trip.itinerary,
          trip.joinableEvents,
        ),
      })
  }, [trip.joinableEvents, trip.itinerary])

  React.useEffect(() => {
    if (!trip.didReadLayout && trip.uid.length >= 0) {
      console.log("initializing layout....")

      readLayout(trip.layout)
      setTrip({ ...trip, didReadLayout: true })
    }
  }, [trip])

  function addNewWidget(type: WidgetType, uid: string) {
    const key = createKey(type, uid)
    addItem(key)
  }
  function getEventsByDay(
    start: Date,
    end: Date,
    itinerary: Array<Array<Event>>,
    joinableEvents: Array<Array<Event>>,
  ) {
    let dayMilli = 1000 * 3600 * 24
    let days: Array<Day> = []

    let iIndex = 0
    let jIndex = 0

    for (let day = start.getTime(); day <= end.getTime(); day += dayMilli) {
      days.push({
        date: new Date(day),
        itinerary: [],
        joinable: [],
      })
      if (iIndex < itinerary.length) {
        if (
          itinerary[iIndex][0].duration.start.getDay() === new Date(day).getDay() &&
          itinerary[iIndex][0].duration.start.getMonth() === new Date(day).getMonth()
        ) {
          days[days.length - 1].itinerary = itinerary[iIndex]
          iIndex += 1
        }
      }

      if (jIndex < joinableEvents.length) {
        if (
          joinableEvents[jIndex][0].duration.start.getDay() === new Date(day).getDay() &&
          joinableEvents[jIndex][0].duration.start.getMonth() === new Date(day).getMonth()
        ) {
          days[days.length - 1].joinable = joinableEvents[jIndex]
          jIndex += 1
        }
      }
    }

    return days
  }
  async function initilizeTrip() {
    let trip = await getTrip()
    let suggestionWidgets = await getSuggestionWidgetData()
    let eventData = await getEventData()
    let pollWidgets = await getPollWidgetData()

    if (suggestionWidgets === null || trip === null || eventData == null) {
      alert("Cannot load trip.")
      return
    }

    console.log("initializing trip....")
    setTrip({
      ...trip,
      polls: pollWidgets,
      suggestions: suggestionWidgets,
      itinerary: eventData.userEvents,
      joinableEvents: eventData.joinableEvents,
      userData: (await getUserData(Array.from(trip.attendees))) as Map<string, User>,
      days: getEventsByDay(
        trip.duration.start,
        trip.duration.end,
        eventData.userEvents,
        eventData.joinableEvents,
      ),
      didReadLayout: false,
    })
  }

  async function getPollWidgetData() {
    const polls = new Map<string, Poll>()

    await fetch(`${API_URL}trip/${id}/polls/`, {
      method: "GET",
    }).then(async (response) => {
      if (response.ok) {
        const { data } = await response.json()

        data.forEach((p: Poll) => {
          polls.set(p.uid, {
            uid: p.uid,
            owner: p.owner,
            title: p.title,
            options: p.options,
          })
        })
      }
    })

    return polls
  }

  async function getUserData(attendees: Array<string>) {
    let userData = attendees.map(async (uid) => {
      const options = createFetchRequestOptions(null, "GET")
      const response = await fetch(`${API_URL}auth/user/getUserByID/${uid}`, options)
      if (response.ok) {
        return await response.json()
      } else {
        return await response.text()
      }
    })

    let responses = await Promise.all(userData)
    return new Map(
      responses.map((value) => {
        return [value.uid, value]
      }),
    )
  }

  async function getSuggestionWidgetData() {
    const suggestionWidgets = new Map<string, SuggestionWidget>()

    await fetch(`${API_URL}trip/${id}/suggestion/`, {
      method: "GET",
    }).then(async (response) => {
      if (response.ok) {
        const { data } = await response.json()

        data.forEach((s: any) => {
          const suggestions = new Map<string, SuggestionOption>()
          s.suggestions.forEach((sug: SuggestionOption) => {
            suggestions.set(sug.uid, {
              ...sug,
              likes: new Set(sug.likes),
            } as SuggestionOption)
          })

          suggestionWidgets.set(s.uid, {
            uid: s.uid,
            owner: s.owner,
            title: s.title,
            suggestions: suggestions,
          })
        })
      }
    })
    return suggestionWidgets
  }
  async function getTrip() {
    const options = createFetchRequestOptions(null, "GET")

    const response = await fetch(`${API_URL}trip/${id}`, options)
    if (response.ok) {
      let t = (await response.json()) as Trip
      return {
        ...t,
        duration: {
          start: new Date(t?.duration.start),
          end: new Date(t?.duration.end),
        },
      }
    }
    return null
  }

  function addEventToList(list: Array<Array<Event>>, event: Event) {
    if (list.length === 0) {
      list.push([
        {
          ...event,
          duration: {
            start: new Date(event.duration.start),
            end: new Date(event.duration.end),
          },
        },
      ])
      return list
    }

    if (
      new Date(list[list.length - 1][0].duration.start).toLocaleDateString() !==
      new Date(event.duration.start).toLocaleDateString()
    ) {
      list.push([
        {
          ...event,
          duration: {
            start: new Date(event.duration.start),
            end: new Date(event.duration.end),
          },
        },
      ])
      return list
    }

    list[list.length - 1].push({
      ...event,
      duration: {
        start: new Date(event.duration.start),
        end: new Date(event.duration.end),
      },
    })
    return list
  }

  // TODO: Handle short break periods when determining joinable events
  async function getEventData() {
    let joinableEvents: Array<Array<Event>> = []
    let userEvents: Array<Array<Event>> = []

    const response = await fetch(`${API_URL}trip/${id}/event`, {
      method: "GET",
    })

    if (response.ok) {
      let data = await response.json()

      const { joinable, itinerary }: { joinable: Array<Event>; itinerary: Array<Event> } = data

      // Determine actualy joinable events
      let joinableIndex = 0

      itinerary.forEach((event: Event, index) => {
        if (joinableIndex < joinable.length) {
          if (
            event.duration.end <= joinable[joinableIndex].duration.start &&
            (index + 1 == itinerary.length ||
              itinerary[index + 1].duration.start >= joinable[joinableIndex].duration.end)
          ) {
            joinableEvents = addEventToList(joinableEvents, joinable[joinableIndex])
            joinableIndex++
          } else if (index === 0 && joinable[joinableIndex].duration.end <= event.duration.start) {
            joinableEvents = addEventToList(joinableEvents, joinable[joinableIndex])
            joinableIndex++
          } else {
            joinableIndex++
          }
        }

        userEvents = addEventToList(userEvents, event)
      })

      while (joinableIndex < joinable.length) {
        joinableEvents = addEventToList(joinableEvents, joinable[joinableIndex])
        joinableIndex++
      }
    }

    if (response.ok) {
      return { userEvents, joinableEvents }
    }
    return null
  }

  async function createSuggestion(
    title: string,
    suggestions: Array<string>,
    callback: (response: Response) => void,
  ) {
    if (user === undefined) {
      callback({ isSuccess: false, errorMessage: "login and try again later." })
      return
    }

    let suggestion = {
      details: { owner: user.uid, title: title },
      suggestions: suggestions,
    }

    const fetchoptions = createFetchRequestOptions(JSON.stringify(suggestion), "POST")
    const response = await fetch(`${API_URL}/trip/${trip.uid}/suggestion`, fetchoptions)

    if (response.ok) {
      let s = await response.json()

      let suggestionWidgets = new Map(trip.suggestions)
      const suggestions = new Map<string, SuggestionOption>()

      s.suggestions.forEach((sug: SuggestionOption) => {
        suggestions.set(sug.uid, {
          ...sug,
          likes: new Set(sug.likes),
        } as SuggestionOption)
      })

      suggestionWidgets.set(s.widget.uid, {
        ...s.widget,
        suggestions: suggestions,
      })

      setTrip({
        ...trip,
        suggestions: suggestionWidgets,
      })
      addNewWidget("suggestion", s.widget.uid)
      callback({ isSuccess: true })
    } else {
      callback({ isSuccess: response.ok, errorMessage: await response.text() })
    }
  }

  // TODO: Allow a user to delete a suggestion widget for the trip.
  async function deleteSuggestion(uid: string) {}

  async function createPoll(
    title: string,
    options: Array<string>,
    callback: (response: Response) => void,
  ) {
    let pollOptions: Array<PollOption> = []

    options.map((option) => {
      pollOptions.push({
        value: option,
        voters: [],
      })
    })

    if (user === undefined) {
      callback({ isSuccess: false, errorMessage: "login and try again later." })
      return
    }
    let poll = {
      owner: user.uid,
      title: title,
      options: pollOptions,
    }

    const fetchoptions = createFetchRequestOptions(JSON.stringify(poll), "POST")
    const response = await fetch(`${API_URL}/trip/${trip.uid}/polls`, fetchoptions)

    if (response.ok) {
      let createdPoll: Poll = await response.json()
      let nPolls = new Map(trip.polls)
      nPolls.set(createdPoll.uid, createdPoll)
      setTrip({
        ...trip,
        polls: nPolls,
      })
      addNewWidget("poll", createdPoll.uid)
      callback({ isSuccess: true })
    } else {
      callback({ isSuccess: response.ok, errorMessage: await response.text() })
    }
  }

  // TODO: Allow a user to delete a poll widget for the trip.
  async function deletePoll(uid: string) {}

  // TODO: Allow a user to create a weather widget for the trip.
  async function createWeather() {}

  // TODO: Allow a user to delete a weather widget for the trip.
  async function deleteWeather(uid: string) {}

  // TODO: Allow a user to delete an activity widget for the trip.
  async function deleteActivityWidget(uid: string) {}

  // TODO: Allow a user to delete an activity widget for the trip.
  async function createActivityWidget() {}

  // TODO: Allow a user to create an availabillity widget for the trip.
  async function createAvailabillityWidget() {}

  // TODO: Allow a user to delete an availabillity widget for the trip
  async function deleteAvailabillityWidget() {}

  async function createEvent(event: CreatedEvent, callback: (isSuccess: boolean) => void) {
    const options = createFetchRequestOptions(JSON.stringify(event), "POST")
    const response = await fetch(`${API_URL}/trip/${trip.uid}/event`, options)

    if (response.ok) {
      let createdEvent: Event = await response.json()
      setTrip({
        ...trip,
        itinerary: Array.from(addEventToList(trip.itinerary, createdEvent)),
      })
    }
    callback(response.ok)
  }

  async function storeLayout() {
    console.log("storing layout...")
    const options = createFetchRequestOptions(
      JSON.stringify({ layout: getStorableLayout(resizable.order) }),
      "PUT",
    )

    const response = await fetch(`${API_URL}/trip/${id}/layout`, options)
    console.log(await response.text())
  }

  async function modifyTrip(details: TripDetails, callback: (response: Response) => void) {
    const options = createFetchRequestOptions(JSON.stringify(details), "PUT")
    const response = await fetch(`${API_URL}/trip/${trip.uid}/modify`, options)

    if (response.ok) {
      callback({ isSuccess: response.ok, result: response.json() })
      setTrip({
        ...trip,
        destination: details.destination,
        duration: details.duration,
      })
    } else {
      callback({ isSuccess: response.ok, errorMessage: await response.text() })
    }
  }

  React.useEffect(() => {
    console.log("getting data for trip:", id)
    if (id !== undefined) initilizeTrip()
  }, [id])

  return (
    <TripContext.Provider
      value={{
        initilizeTrip,
        trip,
        createSuggestion,
        deleteSuggestion,
        createPoll,
        deletePoll,
        createWeather,
        deleteWeather,
        createEvent,
        modifyTrip,
      }}
    >
      {(id === undefined || resizable.order.length === 0) && (
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      {children}
    </TripContext.Provider>
  )
}
