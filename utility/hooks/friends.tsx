import { auth } from "firebase-admin"
import React from "react"
import { API_URL } from "../constants"
import { createFriendPairing } from "../helper"
import { Friendship, User } from "../types/user"
import { useAuth } from "./authentication"
import { AttendeeOption } from "./create/createTrip"
import { useScreen } from "./screen"

interface FriendContext {
  friendList: Map<string, Friendship> | undefined
  sendFriendRequest: (user: User) => Promise<void>
  acceptFriendRequest: (uid: string) => Promise<void>
  removeFriendRequest: (uid: string) => Promise<void>
  addFriendOptions: () => Map<string, AttendeeOption>
}
const FriendContext = React.createContext<FriendContext>({} as FriendContext)

export function useFriend(): FriendContext {
  const context = React.useContext(FriendContext)

  if (!context) {
    throw Error("useFriend must be used within an FriendProvider")
  }
  return context
}

export function FriendProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const { updateErrorToast } = useScreen()
  const [friendList, setFriendList] = React.useState<Map<string, Friendship>>()

  React.useEffect(() => {
    getFriends()
  }, [])
  return (
    <FriendContext.Provider
      value={{
        sendFriendRequest,
        acceptFriendRequest,
        removeFriendRequest,
        friendList,
        addFriendOptions,
      }}
    >
      {children}
    </FriendContext.Provider>
  )

  async function sendFriendRequest(friend: User) {
    await fetch(`${API_URL}friends/${friend.uid}/${user?.uid ?? "uid"}/request`, {
      method: "POST",
    }).then(async (result) => {
      if (result.ok) {
        const request = await result.json()
        const tfriendList = new Map<string, Friendship>(friendList)
        tfriendList.set(request.uid, request)
        setFriendList(tfriendList)
      } else {
        updateErrorToast("could not add friend.")
      }
    })
  }

  async function acceptFriendRequest(uid: string) {
    await fetch(`${API_URL}friends/${uid}/${user?.uid ?? "uid"}/accept`, {
      method: "PUT",
      body: JSON.stringify({
        uid: user?.uid ?? "uid",
      }),
    }).then(async (result) => {
      if (result.ok && user !== undefined) {
        const status = await result.json()
        const tfriendList = new Map<string, Friendship>(friendList)
        const oldFriend = tfriendList.get(createFriendPairing(uid, user.uid)) as Friendship
        tfriendList.set(createFriendPairing(uid, user.uid), {
          ...oldFriend,
          status: status,
        })
        setFriendList(tfriendList)
      } else {
        updateErrorToast("could not accept request.")
      }
    })
  }

  async function removeFriendRequest(uid: string) {
    await fetch(`${API_URL}friends/${uid}/${user?.uid ?? "uid"}`, { method: "DELETE" }).then(
      (result) => {
        if (result.ok && user !== undefined) {
          const tfriendList = new Map<string, Friendship>(friendList)
          tfriendList.delete(createFriendPairing(uid, user.uid))
          setFriendList(tfriendList)
        } else {
          updateErrorToast("could not delete request.")
        }
      },
    )
  }

  function getFriendUID(pairing: Array<string>) {
    if (pairing[0] === user?.uid || user?.uid === undefined) {
      return pairing[1]
    }
    return pairing[0]
  }

  function addFriendOptions() {
    let friendOptions: Map<string, AttendeeOption> = new Map()

    if (friendList === undefined) {
      return friendOptions
    }

    friendList?.forEach((friendship, _) => {
      if (friendship.status.state === "accepted") {
        let uid = getFriendUID(friendship.pairing)
        friendOptions.set(uid, {
          type: "person",
          uid: uid,
          name: friendship.friend.name ?? "",
        })
      }
    })

    return friendOptions
  }

  async function getFriends() {
    let tfriendList = new Map<string, Friendship>()
    await fetch(`${API_URL}friends/user/${user?.uid ?? "uid"}`, { method: "GET" }).then(
      async (result) => {
        if (result.ok) {
          const { friends } = await result.json()
          friends.forEach((friend: Friendship) => {
            tfriendList.set(friend.uid, friend)
          })
        } else {
          updateErrorToast("could not get friends.")
        }

        setFriendList(tfriendList)
      },
    )
  }
}
