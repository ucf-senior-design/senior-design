import { act } from "react-dom/test-utils"
import { mockAllFetch } from "../__mocks__/fetch"
import { mockModifyEvent, MODIFIED_EVENT, ORIGINAL_EVENT } from "../__mocks__/hooks/modifyEvent"

describe("Modify Event Hook", () => {
  beforeEach(() => {
    jest.resetAllMocks()
    // TODO: fix issue with react versions
    jest.spyOn(console, "error").mockImplementation(() => {})
    jest.spyOn(console, "log").mockImplementation(() => {})
  })

  test("Successfully modified", async () => {
    mockAllFetch(true, 200, [
      {
        path: `/trip//event/info/`,
        status: 200,
        ok: true,
        json: () => Promise.resolve({}),
      },
    ])
    const result = mockModifyEvent(ORIGINAL_EVENT)
    await act(async () => {
      await result.current.updateDuration(
        MODIFIED_EVENT.duration.start,
        MODIFIED_EVENT.duration.end,
      )
      await result.current.updateLocation(MODIFIED_EVENT.location)
      await result.current.updateDescription(MODIFIED_EVENT.description)
      await result.current.updateTitle(MODIFIED_EVENT.title)
    })

    expect(await result.current.modify(() => {}, true)).toEqual(true)
  })
  test("Blank Title", async () => {
    mockAllFetch(true, 200, [
      {
        path: `/trip//event/info/`,
        status: 200,
        ok: true,
        json: () => Promise.resolve({}),
      },
    ])
    const result = mockModifyEvent(ORIGINAL_EVENT)
    await act(async () => {
      await result.current.updateDuration(
        MODIFIED_EVENT.duration.start,
        MODIFIED_EVENT.duration.end,
      )
      await result.current.updateLocation(MODIFIED_EVENT.location)
      await result.current.updateDescription(MODIFIED_EVENT.description)
      await result.current.updateTitle("")
    })

    expect(await result.current.modify(() => {}, true)).toEqual(false)
  })

  test("Blank Location", async () => {
    mockAllFetch(true, 200, [
      {
        path: `/trip//event/info/`,
        status: 200,
        ok: true,
        json: () => Promise.resolve({}),
      },
    ])
    const result = mockModifyEvent(ORIGINAL_EVENT)
    await act(async () => {
      await result.current.updateDuration(
        MODIFIED_EVENT.duration.start,
        MODIFIED_EVENT.duration.end,
      )
      await result.current.updateLocation("")
      await result.current.updateDescription(MODIFIED_EVENT.description)
      await result.current.updateTitle(MODIFIED_EVENT.title)
    })

    expect(await result.current.modify(() => {}, true)).toEqual(false)
  })
})
