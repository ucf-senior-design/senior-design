import { act } from "@testing-library/react-hooks/dom"
import { mockAllFetch } from "../__mocks__/fetch"
import {
  mockUseSuggestion,
  SUGESTION,
  SUGGESTION_OPTION,
  SUGGESTION_WITH_SUGGESTIONS,
} from "../__mocks__/hooks/suggestion"

describe("useSuggestion Hook", () => {
  beforeEach(() => {
    jest.resetAllMocks()
    // TODO: fix issue with react versions
    jest.spyOn(console, "error").mockImplementation(() => {})
    jest.spyOn(console, "log").mockImplementation(() => {})
  })

  test("suggstion widget data is probably stored on creation ", () => {
    act(() => {
      mockAllFetch(true, 200)
      const result = mockUseSuggestion(SUGESTION)

      expect({
        owner: result.current.suggestion.owner,
        uid: result.current.suggestion.uid,
        title: result.current.suggestion.title,
        suggestions: result.current.suggestion.suggestions,
      }).toEqual(SUGESTION)
    })
  })

  test("add a new suggestion w/ successful response", async () => {
    mockAllFetch(true, 200)
    const result = mockUseSuggestion(SUGESTION)

    act(() => {
      result.current.storeNewSuggestion(SUGGESTION_OPTION.option)
    })

    await result.current.addSuggestion()

    expect(result.current.suggestion.suggestions.size).toEqual(1)
  })

  test("add a new suggestion w/o successful response", async () => {
    mockAllFetch(true, 200, [
      {
        path: "trip//suggestion/add/uid",
        status: 400,
        ok: false,
        json: () => Promise.resolve({}),
      },
    ])

    const result = mockUseSuggestion(SUGESTION)
    act(() => {
      result.current.storeNewSuggestion(SUGGESTION_OPTION.option)
    })

    await result.current.addSuggestion()

    expect(result.current.suggestion.suggestions.size).toEqual(0)
  })

  test("liking a suggestion w/ successful response", async () => {
    mockAllFetch(true, 200, [
      {
        path: `trip//suggestion/like/${SUGGESTION_WITH_SUGGESTIONS.uid}/${SUGGESTION_OPTION.uid}`,
        status: 200,
        ok: true,
        json: () => Promise.resolve({}),
      },
    ])

    const result = mockUseSuggestion(SUGGESTION_WITH_SUGGESTIONS)
    await result.current.like(SUGGESTION_OPTION.option)

    expect(result.current.didUserLike(SUGGESTION_OPTION.option)).toBe(true)
  })
})
