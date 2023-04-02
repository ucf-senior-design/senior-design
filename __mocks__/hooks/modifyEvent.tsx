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
  duration: { start: new Date(), end: new Date() },
  location: "MODIFIED Sample Location",
  description: "MODIFIED Sample Description",
  uid: "Sample uid",
}

export function callbackFunction() {
  return true
}

export function mockModifyEvent(originalEvent: Event) {
  const wrapper = wrapperForWidgets()

  const { result } = renderHook(() => useModifyEvent(originalEvent), { wrapper })
  return result
}
