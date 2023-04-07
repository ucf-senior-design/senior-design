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
    mockAllFetch(true, 200, [
      {
        path: `/trip//event/info/`,
        status: 200,
        ok: true,
        json: () => Promise.resolve({}),
      },
    ])
    const result = mockModifyEvent(ORIGINAL_EVENT)

    expect(await result.current.modify(() => {})).toEqual(true)
  })
  test("No Title Entered Fail", async () => {
    mockAllFetch(true, 200, [
      {
        path: `/trip//event/info/`,
        status: 400,
        ok: false,
        json: () => Promise.resolve({}),
      },
    ])
    const result = mockModifyEvent({ ...ORIGINAL_EVENT, title: "" })

    expect(await result.current.modify(() => {})).toEqual(false)
  })

  test("No Location Entered Fail", async () => {
    mockAllFetch(true, 200, [
      {
        path: `/trip//event/info/`,
        status: 400,
        ok: false,
        json: () => Promise.resolve({}),
      },
    ])
    const result = mockModifyEvent({ ...ORIGINAL_EVENT, location: "" })

    expect(await result.current.modify(() => {})).toEqual(false)
  })
})
