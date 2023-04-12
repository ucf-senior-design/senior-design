import { Backdrop, CircularProgress } from "@mui/material"
import dayjs from "dayjs"
import React from "react"
import { API_URL } from "../constants"
import { createFetchRequestOptions } from "../fetch"
import { Response } from "../types/helper"
import {
  ActivityPref,
  ActivityPrefWidget,
  AvailabillityWidget,
  CreatedEvent,
  Duration,
  Event,
  ModifiedEvent,
  Poll,
  PollOption,
  StoredLocation,
  SuggestionOption,
  SuggestionWidget,
  Trip,
  UserAvailabillity,
  WidgetType,
} from "../types/trip"
import { User } from "../types/user"
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
  activityPreferences: Map<string, ActivityPrefWidget>
  availabillity: Map<string, AvailabillityWidget>
  didReadLayout: boolean
}

export interface TripDetails {
  duration: Duration
  destination: string
  photoURL: string
  layout: Array<StoredLocation>
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
  deleteSuggestion: (uid: string, callback: (isSuccess: boolean) => void) => Promise<void>

  // handle polls
  createPoll: (
    title: string,
    options: Array<string>,
    callback: (response: Response) => void,
  ) => Promise<void>
  deletePoll: (uid: string, callback: (isSuccess: boolean) => void) => Promise<void>

  // handle weather widgetcreateP
  createWeather: (callback: (response: Response) => void) => void
  deleteWeather: (uid: string, callback: (isSuccess: boolean) => void) => Promise<void>

  // handle events
  createEvent: (event: CreatedEvent, callback: (isSucess: boolean) => void) => Promise<void>
  modifyTrip: (details: TripDetails, callback: () => void) => Promise<void>
  modifyEvent: (event: ModifiedEvent, callback: (isSuccess: boolean) => void) => Promise<void>

  // handle preferences widget
  deleteActivityWidget: (uid: string, callback: (isSuccess: boolean) => void) => Promise<void>
  createActivityWidget: (
    preferences: ActivityPref,
    callback: (isSuccess: boolean) => void,
  ) => Promise<void>

  createAvailabillityWidget: (
    data: { title: string; dates: Array<Duration> },
    callback: (isSuccess: boolean) => void,
  ) => Promise<void>
  deleteAvailabillityWidget: (uid: string, callback: (isSuccess: boolean) => void) => Promise<void>

  deletePhotoDump: (url: string, callback: (isSuccess: boolean) => void) => void
  createPhotoDump: (url: string, callback: (response: Response) => void) => void
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

  const { readLayout, createKey, addItem, resizable, getStorableLayout, moving, removeFromLayout } =
    useResizable()
  const { updateErrorToast } = useScreen()
  const [trip, setTrip] = React.useState<TripUseState>({
    // Trip Values
    uid: "",
    attendees: new Set(),
    duration: {
      start: new Date(),
      end: new Date(),
    },
    layout: [],
    destination: "",
    photoURL: "",
    itinerary: [],
    joinableEvents: [],

    // Widget Data
    availabillity: new Map(),
    polls: new Map<string, Poll>(),
    activityPreferences: new Map<string, ActivityPrefWidget>(),
    suggestions: new Map<string, SuggestionWidget>(),

    // Other
    userData: new Map<string, User>(),
    days: [],
    didReadLayout: false,
  })

  const { user } = useAuth()

  React.useEffect(() => {
    readLayout(trip.layout)
    storeLayout()
  }, [trip.layout])
  React.useEffect(() => {
    if (resizable.order.length !== 0) {
      storeLayout()
    }
  }, [resizable])

  React.useEffect(() => {
    if (window !== undefined && window.location !== undefined) {
      let location = window.location.search
      setId(location.replace("?id=", ""))
    }
  }, [])

  React.useEffect(() => {
    console.log("itinerary update.....")
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
  }, [trip.joinableEvents, trip.itinerary, trip.duration])

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
    let days: Array<Day> = []

    let day = dayjs(start)

    while (!dayjs(end).add(1, "day").isSame(day, "day")) {
      days.push({
        date: day.toDate(),
        itinerary: itinerary[days.length],
        joinable: joinableEvents[days.length],
      })

      day = day.add(1, "day")
    }

    return days
  }

  async function initilizeTrip() {
    if (id === undefined) {
      return
    }
    let trip = await getTrip()
    let suggestionWidgets = await getSuggestionWidgetData()
    if (trip === null) {
      updateErrorToast("cannot load trip.")
      return
    }

    let eventData = await getEventData(
      dayjs(trip.duration.end).diff(dayjs(trip.duration.start), "days"),
      trip.duration,
    )
    let pollWidgets = await getPollWidgetData()
    let availabillityWidgets = await getAvailabillityWidgetData()
    let prefWidgets = await getPreferenceWidgetData()

    if (suggestionWidgets === null || trip === null || eventData == null) {
      updateErrorToast("cannot load trip.")
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
      availabillity: availabillityWidgets,
      days: getEventsByDay(
        trip.duration.start,
        trip.duration.end,
        eventData.userEvents,
        eventData.joinableEvents,
      ),
      activityPreferences: prefWidgets,
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
        if (data !== undefined && data !== null)
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

  async function getPreferenceWidgetData() {
    const prefWidgets = new Map<string, ActivityPrefWidget>()

    const response = await fetch(`${API_URL}trip/${id}/activityPref/`, {
      method: "GET",
    })

    if (response.ok) {
      const { data } = await response.json()

      data.forEach((widget: any) => {
        prefWidgets.set(widget.uid, {
          ...widget,
          sports: new Set(widget.sports),
          nature: new Set(widget.nature),
          sightseeing: new Set(widget.sightseeing),
          lowPrice: new Set(widget.lowPrice),
          medPrice: new Set(widget.medPrice),
          highPrice: new Set(widget.highPrice),
          veryHighPrice: new Set(widget.veryHighPrice),
        })
      })
    }
    return prefWidgets
  }
  async function getAvailabillityWidgetData() {
    const availabillityWidgets = new Map<string, AvailabillityWidget>()

    const response = await fetch(`${API_URL}trip/${id}/availabillity/`, {
      method: "GET",
    })

    if (response.ok) {
      const { data } = await response.json()
      data.forEach((widget: any) => {
        let availMap = new Map<string, UserAvailabillity>(
          widget.availabillities.map((avail: any) => {
            return [avail.uid, { dates: avail.dates, uid: avail.uid }]
          }),
        )
        availabillityWidgets.set(widget.uid, {
          ...widget,
          availabillities: availMap,
        })
      })
    }

    return availabillityWidgets
  }

  async function getSuggestionWidgetData() {
    const suggestionWidgets = new Map<string, SuggestionWidget>()

    await fetch(`${API_URL}trip/${id}/suggestion/`, {
      method: "GET",
    }).then(async (response) => {
      if (response.ok) {
        const { data } = await response.json()

        if (data !== undefined && data !== null)
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

      if (t !== undefined && t !== null && t.duration !== undefined)
        return {
          ...t,
          duration: {
            start: new Date(t?.duration.start),
            end: new Date(t?.duration.end),
          },
        }
    } else {
      console.log("error loading trip", await response.text())
    }
    return null
  }

  function addEventToList(list: Array<Array<Event>>, event: Event, duration: Duration) {
    let l = Array.from(list)
    let index = 0
    let current = dayjs(duration.start)
    let end = dayjs(duration.end)

    while (current <= end) {
      if (current.date() === dayjs(event.duration.start).date()) {
        let oldDay = l[index]
        oldDay.push({
          ...event,
          duration: {
            start: new Date(event.duration.start),
            end: new Date(event.duration.end),
          },
        })

        oldDay = oldDay.sort((a, b) => a.duration.start.getTime() - b.duration.start.getTime())
        l[index] = oldDay
        return l
      }
      index += 1
      current = current.add(1, "day")
    }

    return l
  }

  function replaceEventInList(list: Array<Array<Event>>, event: Event) {
    for (let i = 0; i < list.length; i++) {
      for (let j = 0; j < list[i].length; j++) {
        if (list[i][j].uid === event.uid) {
          list[i][j] = event
        }
      }
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

  // TODO: Delete Later
  console.log(trip)
  async function getEventData(days: number, duration: Duration) {
    let joinableEvents: Array<Array<Event>> = []
    let userEvents: Array<Array<Event>> = []

    for (let i = 0; i <= days; i++) {
      joinableEvents.push([])
      userEvents.push([])
    }

    const response = await fetch(`${API_URL}trip/${id}/${user?.uid ?? "uid"}/event`, {
      method: "GET",
    })

    if (response.ok) {
      let data = await response.json()

      const { joinable, itinerary }: { joinable: Array<Event>; itinerary: Array<Event> } = data
      if (
        joinable === undefined ||
        joinable === null ||
        itinerary === undefined ||
        itinerary === null
      ) {
        return null
      }

      itinerary.forEach((event: Event) => {
        userEvents = addEventToList(userEvents, event, duration)
      })

      joinable.forEach((event: Event) => {
        joinableEvents = addEventToList(joinableEvents, event, duration)
      })
    }

    console.log(response.ok)
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

  async function deleteSuggestion(uid: string, callback: (isSuccess: boolean) => void) {
    const response = await fetch(`${API_URL}/trip/${trip.uid}/suggestion/${uid}`, {
      method: "DELETE",
    })
    removeFromLayout(createKey("suggestion", uid))
    storeLayout()
    callback(response.ok)
  }

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

  async function deletePoll(uid: string, callback: (isSuccess: boolean) => void) {
    const response = await fetch(`${API_URL}/trip/${trip.uid}/polls/${uid}`, {
      method: "DELETE",
    })

    if (response.ok) {
      removeFromLayout(createKey("poll", uid))
      storeLayout()
    }

    callback(response.ok)
  }

  function createPhotoDump(url: string, callback: (response: Response) => void) {
    if (user === undefined) {
      callback({ isSuccess: false, errorMessage: "login and try again later." })
      return
    }
    addNewWidget("photo", url)
    callback({ isSuccess: true })
  }

  function deletePhotoDump(url: string, callback: (isSuccess: boolean) => void) {
    removeFromLayout(createKey("photo", url))
    storeLayout()
    callback(true)
  }
  function createWeather(callback: (response: Response) => void) {
    if (user === undefined) {
      callback({ isSuccess: false, errorMessage: "login and try again later." })
      return
    }
    addNewWidget("weather", user.uid)
    callback({ isSuccess: true })
  }

  async function deleteWeather(uid: string, callback: (isSuccess: boolean) => void) {
    removeFromLayout(createKey("weather", uid))
    storeLayout()
    callback(true)
  }

  async function deleteActivityWidget(uid: string, callback: (isSuccess: boolean) => void) {
    const response = await fetch(`${API_URL}/trip/${trip.uid}/activityPref/${uid}`, {
      method: "DELETE",
    })

    if (response.ok) {
      removeFromLayout(createKey("preference", uid))
      storeLayout()
    }

    callback(response.ok)
  }

  async function createActivityWidget(
    preferences: ActivityPref,
    callback: (isSuccess: boolean) => void,
  ) {
    const options = createFetchRequestOptions(JSON.stringify(preferences), "POST")
    const response = await fetch(`${API_URL}/trip/${trip.uid}/activityPref`, options)

    if (response.ok) {
      let widget = await response.json()
      let map = new Map(trip.activityPreferences)
      map.set(widget.uid, {
        ...widget,
        sports: new Set(widget.sports),
        nature: new Set(widget.nature),
        sightseeing: new Set(widget.sightseeing),
        lowPrice: new Set(widget.lowPrice),
        medPrice: new Set(widget.medPrice),
        highPrice: new Set(widget.highPrice),
        veryHighPrice: new Set(widget.veryHighPrice),
      })

      setTrip({
        ...trip,
        activityPreferences: map,
      })
      addNewWidget("preference", widget.uid)
    }

    callback(response.ok)
  }

  async function createAvailabillityWidget(
    data: { title: string; dates: Array<Duration> },
    callback: (isSuccess: boolean) => void,
  ) {
    const options = createFetchRequestOptions(
      JSON.stringify({ ...data, uid: user?.uid ?? "uid" }),
      "POST",
    )
    const response = await fetch(`${API_URL}/trip/${trip.uid}/availabillity`, options)

    if (response.ok) {
      const widget = await response.json()

      let map = new Map(trip.availabillity)
      let availMap = new Map<string, UserAvailabillity>()
      availMap.set(user?.uid ?? "", {
        uid: user?.uid ?? "",
        dates: data.dates,
      })

      map.set(widget.uid, {
        ...widget,
        availabillities: availMap,
      })

      setTrip({
        ...trip,
        availabillity: map,
      })
      addNewWidget("availabillity", widget.uid)
    }

    callback(response.ok)
  }

  async function deleteAvailabillityWidget(uid: string, callback: (isSuccess: boolean) => void) {
    const response = await fetch(`${API_URL}/trip/${trip.uid}/availabillity`, { method: "DELETE" })

    if (response.ok) {
      removeFromLayout(createKey("availabillity", uid))
      storeLayout()
    }

    callback(response.ok)
  }

  async function createEvent(event: CreatedEvent, callback: (isSuccess: boolean) => void) {
    const options = createFetchRequestOptions(JSON.stringify(event), "POST")
    const response = await fetch(`${API_URL}/trip/${trip.uid}/event`, options)

    if (response.ok) {
      let createdEvent: Event = await response.json()
      console.log(createdEvent)

      let itinerary = Array.from(addEventToList(trip.itinerary, createdEvent, trip.duration))

      setTrip({
        ...trip,
        itinerary: itinerary,
        days: getEventsByDay(
          trip.duration.start,
          trip.duration.end,
          itinerary,
          trip.joinableEvents,
        ),
      })
    }

    callback(response.ok)
  }
  async function modifyEvent(event: ModifiedEvent, callback: (isSuccess: boolean) => void) {
    const options = createFetchRequestOptions(
      JSON.stringify({ ...event, user: user?.uid ?? "" }),
      "PUT",
    )
    const response = await fetch(`${API_URL}/trip/${trip.uid}/event/info/${event.uid}`, options)
    if (response.ok) {
      let modifiedEvent: Event = await response.json()
      setTrip({
        ...trip,

        itinerary: Array.from(replaceEventInList(trip.itinerary, modifiedEvent)),
      })
      initilizeTrip()
    }
    callback(response.ok)
  }

  async function storeLayout() {
    if (id !== undefined) {
      console.log("storing layout...")
      const options = createFetchRequestOptions(
        JSON.stringify({ layout: getStorableLayout(resizable.order) }),
        "PUT",
      )

      const response = await fetch(`${API_URL}/trip/${id}/layout`, options)
    }
  }

  async function modifyTrip(details: TripDetails, callback: () => void) {
    const options = createFetchRequestOptions(JSON.stringify(details), "PUT")
    const response = await fetch(`${API_URL}/trip/${trip.uid}/modify`, options)
    const responseLayout = await fetch(`${API_URL}/trip/${trip.uid}/layout`, options)

    if (response.ok && responseLayout.ok) {
      initilizeTrip()

      callback()
    }
  }

  console.warn("user", user?.loggedIn)
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
        modifyEvent,
        createActivityWidget,
        deleteActivityWidget,
        createAvailabillityWidget,
        deleteAvailabillityWidget,
        createPhotoDump,
        deletePhotoDump,
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
