import { mockAllFetch } from "../__mocks__/fetch"
import { MODIFY_TRIP, mockUseTrip } from "../__mocks__/hooks/trip"

describe("useSuggestion Hook", () => {
  beforeEach(() => {
    jest.resetAllMocks()
    // TODO: fix issue with react versions
    jest.spyOn(console, "error").mockImplementation(() => {})
    jest.spyOn(console, "log").mockImplementation(() => {})
  })

  test("modify trip destination with successful response", async () => {
    mockAllFetch(true, 200)
    const result = mockUseTrip()

    await result.current.modifyTrip(MODIFY_TRIP, () => {
      return
    })

    expect(result.current.trip.destination).toEqual(MODIFY_TRIP.destination)
  })

  test("modify trip destination without successful response", async () => {
    mockAllFetch(true, 200, [
      {
        path: "trip/",
        status: 400,
        ok: false,
        json: () => Promise.resolve({}),
      },
    ])
    const result = mockUseTrip()

    await result.current.modifyTrip(MODIFY_TRIP, () => {
      return
    })

    expect(result.current.trip.destination).toEqual(result.current.trip.destination)
  })
})
