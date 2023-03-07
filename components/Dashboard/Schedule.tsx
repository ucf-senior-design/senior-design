import React from "react"
import { useTrip } from "../../utility/hooks/trip"
import Day from "./Day"

export default function Schedule() {
  const { trip } = useTrip()
  const [schedule, setSchedule] = React.useState<React.ReactNode>(<></>)
  function createSchedule() {
    let jIndex = 0
    let iIndex = 0
    let s: Array<React.ReactNode> = []

    while (iIndex < trip.itinerary.length || jIndex < trip.joinableEvents.length) {
      if (iIndex < trip.itinerary.length && jIndex < trip.joinableEvents.length) {
        if (
          trip.itinerary[iIndex][0].duration.start.toLocaleDateString() <
          trip.joinableEvents[jIndex][0].duration.start.toLocaleDateString()
        ) {
          s.push(
            <Day
              day={trip.itinerary[iIndex][0].duration.start}
              events={trip.itinerary[iIndex]}
              joinableEvents={[]}
              weatherIcon={<></>}
              temperature={70}
            />,
          )
          iIndex++
        } else if (
          trip.itinerary[iIndex][0].duration.start.toLocaleDateString() >
          trip.joinableEvents[jIndex][0].duration.start.toLocaleDateString()
        ) {
          s.push(
            <Day
              day={trip.joinableEvents[jIndex][0].duration.start}
              events={[]}
              joinableEvents={trip.joinableEvents[jIndex]}
              weatherIcon={<></>}
              temperature={70}
            />,
          )
          jIndex++
        } else {
          s.push(
            <Day
              day={trip.itinerary[iIndex][0].duration.start}
              events={trip.itinerary[iIndex]}
              joinableEvents={trip.joinableEvents[jIndex]}
              weatherIcon={<></>}
              temperature={70}
            />,
          )
          jIndex++
          iIndex++
        }
      } else if (iIndex < trip.itinerary.length) {
        s.push(
          <Day
            day={trip.itinerary[iIndex][0].duration.start}
            events={trip.itinerary[iIndex]}
            joinableEvents={[]}
            weatherIcon={<></>}
            temperature={70}
          />,
        )
        iIndex++
      } else {
        s.push(
          <Day
            day={trip.joinableEvents[jIndex][0].duration.start}
            events={[]}
            joinableEvents={trip.joinableEvents[jIndex]}
            weatherIcon={<></>}
            temperature={70}
          />,
        )
        jIndex++
      }
    }
    setSchedule(<>{s}</>)
  }

  React.useEffect(() => {
    createSchedule()
  }, [trip.joinableEvents, trip.itinerary])

  return <>{schedule}</>
}
