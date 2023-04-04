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

  test("Modify Event Success", async () => {
    mockAllFetch(true, 200, [
      {
        path: `/trip//event/info/${ORIGINAL_EVENT.uid}`,
        status: 200,
        ok: true,
        json: () => Promise.resolve({}),
      },
    ])
    const result = mockModifyEvent(ORIGINAL_EVENT)
    act(async () => {
      await result.current.updateDuration(
        MODIFIED_EVENT.duration.start,
        MODIFIED_EVENT.duration.end,
      )
      result.current.updateLocation(MODIFIED_EVENT.location)
      result.current.updateTitle(MODIFIED_EVENT.title)
      result.current.updateDescription(MODIFIED_EVENT.description)
    })
    await result.current.modify(() => {})
    expect({
      uid: result.current.modifiedEvent.uid,
      title: result.current.modifiedEvent.title,
      duration: result.current.modifiedEvent.duration,
      location: result.current.modifiedEvent.location,
      description: result.current.modifiedEvent.description,
    }).toEqual(MODIFIED_EVENT)
  })
  test("Event Update", async () => {
    mockAllFetch(true, 400, [
      {
        path: `/trip//event/info/${ORIGINAL_EVENT.uid}`,
        status: 400,
        ok: false,
        json: () => Promise.resolve({}),
      },
    ])
    const result = mockModifyEvent(ORIGINAL_EVENT)
    act(async () => {
      await result.current.updateDuration(
        MODIFIED_EVENT.duration.start,
        MODIFIED_EVENT.duration.end,
      )
      result.current.updateLocation("MODIFIED_EVENT.location")
      result.current.updateTitle("")
      result.current.updateDescription(MODIFIED_EVENT.description)
      result.current.setModifiedEvent({ ...result.current.modifiedEvent, attendees: [] })
    })
    await result.current.modify(() => {})

    expect({
      uid: result.current.modifiedEvent.uid,
      title: result.current.modifiedEvent.title,
      duration: result.current.modifiedEvent.duration,
      location: result.current.modifiedEvent.location,
      description: result.current.modifiedEvent.description,
    }).toEqual(ORIGINAL_EVENT)
  })
})
