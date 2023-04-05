import { act } from "@testing-library/react-hooks/dom"
import { mockAllFetch } from "../__mocks__/fetch"
import { mockUsePoll, POLL } from "../__mocks__/hooks/poll"

describe("polls hook", () => {
  beforeEach(() => {
    jest.resetAllMocks()
    mockAllFetch(true, 200)
  })

  // poll widget data stored on creation
  test("poll widget stored on creation", () => {
    act(() => {
      mockAllFetch(true, 200)
      const result = mockUsePoll(POLL)

      expect({
        owner: result.current.poll.owner,
        uid: result.current.poll.uid,
        title: result.current.poll.title,
        options: result.current.poll.options,
      }).toEqual(POLL)
    })
  })

  // vote on an option w/ successful response
  test("successfully vote on a poll option", async () => {
    mockAllFetch(true, 200, [
      {
        path: `trip//poll/vote`,
        status: 200,
        ok: true,
        json: () => Promise.resolve({}),
      },
    ])
    const result = mockUsePoll(POLL)

    act(() => {
      result.current.selectOption(0)
    })

    await result.current.doVote()

    expect(result.current.poll.options.length).toEqual(1)
  })
})
