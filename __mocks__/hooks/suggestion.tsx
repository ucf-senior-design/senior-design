import { renderHook } from "@testing-library/react-hooks/dom"
import useSuggestion from "../../utility/hooks/suggestion"
import { SuggestionOption, SuggestionWidget } from "../../utility/types/trip"
import { wrapperForWidgets } from "../wrapper"

export const SUGGESTION_OPTION: SuggestionOption = {
  uid: "sample_suggestion",
  owner: "owner",
  option: "sample_suggestion",
  likes: new Set(["user"]),
}
export const SUGESTION: SuggestionWidget = {
  owner: "owner",
  uid: "uid",
  title: "title",
  suggestions: new Map(),
}

export const SUGGESTION_WITH_SUGGESTIONS: SuggestionWidget = {
  ...SUGESTION,
  suggestions: new Map([[SUGGESTION_OPTION.uid, SUGGESTION_OPTION]]),
}

export function mockUseSuggestion(suggestion: SuggestionWidget) {
  const wrapper = wrapperForWidgets()
  const { result } = renderHook(() => useSuggestion(suggestion), { wrapper })
  return result
}
