import { mockAllFetch } from "../__mocks__/fetch"
import { MOCK_FRIEND, mockUseFriend } from "../__mocks__/hooks/friend"
import { User } from "../utility/types/user"

describe("useSuggestion Hook", () => {
  beforeEach(() => {
    jest.resetAllMocks()
    // TODO: fix issue with react versions
    jest.spyOn(console, "error").mockImplementation(() => {})
    jest.spyOn(console, "log").mockImplementation(() => {})

    // TODO: Mock firebase log in
    const currentUser: User = {
        uid: '123',
        email: '',
        name: '',
        profilePic: '',
        username: '',
        medicalInfo: [],
        allergies: []
    }
  })

  test("send friend request", async () => {
    mockAllFetch(true, 200)
    const result = mockUseFriend()

    await result.current.sendFriendRequest(MOCK_FRIEND)

    // expect the result.pairings to contain MOCK_FRIEND.uid and currentUser.uid 
    // expect().toEqual()
  })
})
