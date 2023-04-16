import { act } from "react-dom/test-utils"
import { mockAllFetch } from "../__mocks__/fetch"
import { mockModifyEvent, ORIGINAL_EVENT } from "../__mocks__/hooks/modifyEvent"

describe("Modify Event Hook", () => {
  beforeEach(() => {
    jest.resetAllMocks()
    // TODO: fix issue with react versions
    jest.spyOn(console, "error").mockImplementation(() => {})
    jest.spyOn(console, "log").mockImplementation(() => {})
  })

  test("Event successfully modified completely", async () => {
    mockAllFetch(true, 200)
    const result = mockModifyEvent(ORIGINAL_EVENT)
    const onSuccessCallback = jest.fn(() => {})
    act(async () => {
      result.current.modify(() => onSuccessCallback)
    })
    expect(onSuccessCallback).toBeCalledTimes(1)
  })
  test("No Title Entered Should Fail", async () => {
    mockAllFetch(true, 200, [
      {
        path: `/trip//event/info/`,
        status: 400,
        ok: false,
        json: () => Promise.resolve({}),
      },
    ])
    const result = mockModifyEvent({ ...ORIGINAL_EVENT, title: "" })
    const onSuccessCallback = jest.fn(() => {})
    act(() => {
      result.current.modify(onSuccessCallback)
    })
    expect(onSuccessCallback).toBeCalledTimes(0)
  })

  test("No Location Entered Should Fail", async () => {
    mockAllFetch(true, 200, [
      {
        path: `/trip//event/info/`,
        status: 400,
        ok: false,
        json: () => Promise.resolve({}),
      },
    ])
    const result = mockModifyEvent({ ...ORIGINAL_EVENT, location: "" })
    const onSuccessCallback = jest.fn(() => {})
    act(() => {
      result.current.modify(onSuccessCallback)
    })
    expect(onSuccessCallback).toBeCalledTimes(0)
  })
})
