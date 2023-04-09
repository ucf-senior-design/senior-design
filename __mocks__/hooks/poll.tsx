import { renderHook } from "@testing-library/react-hooks/dom"
import usePoll from "../../utility/hooks/polls"
import { PollOption, Poll as PollType } from "../../utility/types/trip"
import { wrapperForWidgets } from "../wrapper"

export const POLL_OPTION: PollOption = {
  value: "value",
  voters: new Array<string>(),
}
export const POLL: PollType = {
  owner: "owner",
  uid: "uid",
  title: "title",
  options: new Array<PollOption>(POLL_OPTION),
}
export function mockUsePoll(p: PollType) {
  const wrapper = wrapperForWidgets()
  const { result } = renderHook(() => usePoll(p), { wrapper })
  return result
}
