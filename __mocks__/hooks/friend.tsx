import { renderHook } from "@testing-library/react-hooks/dom"
import { useFriend } from "../../utility/hooks/friends"
import { User } from "../../utility/types/user"
import { wrapperForWidgets } from "../wrapper"

export const MOCK_FRIEND: User = {
    uid: '456',
    email: '',
    name: '',
    profilePic: '',
    username: '',
    medicalInfo: [],
    allergies: []
}

export function mockUseFriend() {
  const wrapper = wrapperForWidgets()
  const { result } = renderHook(() => useFriend(), { wrapper })
  return result
}
