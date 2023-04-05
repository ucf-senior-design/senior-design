import { wrapperForWidgets } from "../wrapper"
import { renderHook } from "@testing-library/react-hooks/dom"
import useCreateEvent from "../../utility/hooks/create/createEvent"

export const EMPTY_EVENT = {
  title: "",
  attendees: [],
  duration: { start: new Date(), end: new Date() },
  location: "",
  description: "",
  attendeeOptions: [],
}

export function mockUseCreateEvent() {
  const wrapper = wrapperForWidgets()
  const { result, waitForNextUpdate } = renderHook(() => useCreateEvent(), { wrapper })
  return { result, waitForNextUpdate }
}
