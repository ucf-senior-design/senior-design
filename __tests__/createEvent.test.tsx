import React from "react"
import { act } from "react-dom/test-utils"
import { mockAllFetch } from "../__mocks__/fetch"
import { mockUseCreateEvent } from "../__mocks__/hooks/createEvent"

describe("Create Event Hook", () => {
  beforeEach(() => {
    jest.resetAllMocks()
    jest.spyOn(console, "error").mockImplementation(() => {})
    jest.spyOn(console, "log").mockImplementation(() => {})
  })

  test("Cannot create empty event", () => {
    mockAllFetch(true, 200)
    const { result } = mockUseCreateEvent()
    const onSuccessCallback = jest.fn(() => {})
    act(() => {
      result.current.create(onSuccessCallback)
    })
    expect(onSuccessCallback).toBeCalledTimes(0)
  })

  test("Adds friends as options for event", () => {
    mockAllFetch(true, 200)
    const { result, waitForNextUpdate } = mockUseCreateEvent()

    act(() => {
      waitForNextUpdate()
    })

    console.info(result.current.event)

    expect(result.current.event.attendeeOptions.length).toBe(2)
  })

  test("Test add attendee option", () => {})
})
