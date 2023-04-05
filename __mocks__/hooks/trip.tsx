import { renderHook } from "@testing-library/react-hooks/dom"
import { TripDetails, useTrip } from "../../utility/hooks/trip"
import { wrapperForWidgets } from "../wrapper"

export const MODIFY_TRIP: TripDetails = {
  duration: { start: new Date(), end: new Date() },
  destination: "Paris, France",
  photoURL: "",
  layout: [],
}

export function mockUseTrip() {
  const wrapper = wrapperForWidgets()
  const { result } = renderHook(() => useTrip(), { wrapper })
  return result
}
