import React from "react"
import { createFetchRequestOptions } from "../fetch"
import { Trip } from "../types/trip"
import { useAuth } from "./authentication"
import { Response } from "../types/helper"

interface DashboardContext {
  trips: Map<string, Trip> | undefined
  getTrips: () => Promise<void>
  createTrip: (trip: Trip, callback: (response: Response) => void) => Promise<void>
  deleteTrip: (tripID: string, callback: (response: Response) => void) => Promise<void>
  joinTrip: (tripID: string, callback: (response: Response) => void) => Promise<void>
  leaveTrip: (tripID: string, callback: (response: Response) => void) => Promise<void>
}

const DashboardContext = React.createContext<DashboardContext>({} as DashboardContext)

export function useDashboard(): DashboardContext {
  const context = React.useContext(DashboardContext)

  if (!context) {
    throw Error("useDashboard  must be used within an DashboardProvider")
  }
  return context
}

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const [trips, setTrips] = React.useState<Map<string, Trip>>()
  const { user } = useAuth()

  React.useEffect(() => {
    console.log("getting user trips....")
    getTrips()
  }, [])

  return (
    <DashboardContext.Provider
      value={{
        trips,
        getTrips,
        createTrip,
        deleteTrip,
        joinTrip,
        leaveTrip,
      }}
    >
      {children}
    </DashboardContext.Provider>
  )

  async function getTrips() {
    const options = createFetchRequestOptions(null, "GET")
    const tTrips = new Map<string, Trip>()
    await fetch(`${API_URL}trip/none/${user?.uid ?? "uid"}/trip`, options).then(
      async (response) => {
        if (response.ok) {
          await response.json().then((uTrips) => {
            uTrips.forEach((trip: Trip) => {
              trip.duration.start = new Date(trip.duration.start)
              trip.duration.end = new Date(trip.duration.end)
              trip.attendees = new Set(trip.attendees)
              tTrips.set(trip.uid, trip)
            })
          })

          setTrips(tTrips)
        }
      },
    )
  }

  async function createTrip(trip: Trip, callback: (response: Response) => void) {
    const options = createFetchRequestOptions(JSON.stringify(trip), "POST")
    const response = await fetch(`${API_URL}/trip`, options)

    if (response.ok) {
      const newTrip: Trip = await response.json()
      const nTrips = new Map<string, Trip>(trips)

      nTrips.set(newTrip.uid, newTrip)
      setTrips(nTrips)
    } else {
      alert("Could not create trip.")
    }
    callback({ isSuccess: response.ok })
  }

  async function deleteTrip(tripID: string, callback: (response: Response) => void) {
    const response = await fetch(`${API_URL}trip/${tripID}`, {
      method: "DELETE",
    })

    if (response.ok) {
      const nTrips = new Map<string, Trip>(trips)

      nTrips.delete(tripID)
      setTrips(nTrips)
    }
    callback({ isSuccess: response.ok })
  }

  async function joinTrip(tripID: string, callback: (response: Response) => void) {
    const response = await fetch(`${API_URL}trip/${tripID}/join`, {
      method: "PUT",
    })

    if (response.ok) {
      const nTrips = new Map<string, Trip>(trips)
      const t = nTrips.get(tripID)

      if (t !== undefined && user !== undefined) {
        t.attendees.add(user.uid)
        nTrips.set(tripID, t)
      }

      setTrips(nTrips)
    }
    callback({
      isSuccess: response.ok,
    })
  }

  async function leaveTrip(tripID: string, callback: (response: Response) => void) {
    const options = createFetchRequestOptions(tripID, "PUT")
    const response = await fetch(`${API_URL}trip/${tripID}/leave`, options)
    if (response.ok) {
      const nTrips = new Map<string, Trip>(trips)
      const t = nTrips.get(tripID)

      if (t !== undefined && user !== undefined) {
        t.attendees.delete(user.uid)
        nTrips.set(tripID, t)
      }

      setTrips(nTrips)
    } else {
      callback({
        isSuccess: response.ok,
      })
    }
  }
}
