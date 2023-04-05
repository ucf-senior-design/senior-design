import { renderHook } from "@testing-library/react-hooks/dom"
import useModifyEvent from "../../utility/hooks/modify/modifyEvent"
import { Event, ModifiedEvent } from "../../utility/types/trip"
import { wrapperForWidgets } from "../wrapper"

export const ORIGINAL_EVENT: Event = {
  title: "Sample Title",
  duration: { start: new Date(), end: new Date() },
  attendees: [],
  location: "Sample Location",
  description: "Sample Description",
  uid: "Sample uid",
}
export const MODIFIED_EVENT: ModifiedEvent = {
  title: "MODIFIED Sample Title",
  duration: {
    start: new Date("2023-04-03T23:04:45.155Z"),
    end: new Date("2023-04-03T23:14:45.155Z"),
  },
  location: "MODIFIED Sample Location",
  description: "MODIFIED Sample Description",
  uid: "Sample uid",
}
export const MODIFIED_EVENT_WITH_ATTENDEES = {
  title: "MODIFIED Sample Title",
  duration: { start: new Date(), end: new Date() },
  location: "MODIFIED Sample Location",
  description: "MODIFIED Sample Description",
  uid: "Sample uid",
  attendees: [],
}

export function mockModifyEvent(originalEvent: Event) {
  const wrapper = wrapperForWidgets()

  const { result } = renderHook(() => useModifyEvent(originalEvent), { wrapper })
  return result
}
