import { auth } from "firebase-admin"
import React from "react"
import { API_URL } from "../constants"
import { createFriendPairing } from "../helper"
import { Friendship, User } from "../types/user"
import { useAuth } from "./authentication"
import { useScreen } from "./screen"

interface FriendContext {
  friendList: Map<string, Friendship> | undefined
  sendFriendRequest: (user: User) => Promise<void>
  acceptFriendRequest: (uid: string) => Promise<void>
  removeFriendRequest: (uid: string) => Promise<void>
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
  const { doSearch, user } = useAuth()
  const { updateErrorToast } = useScreen()
  const [friendList, setFriendList] = React.useState<Map<string, Friendship>>()

  React.useEffect(() => {
    getFriends()
  }, [])
  return (
    <FriendContext.Provider
      value={{ sendFriendRequest, acceptFriendRequest, removeFriendRequest, friendList }}
    >
      {children}
    </FriendContext.Provider>
  )

  async function sendFriendRequest(user: User) {
    await fetch(`${API_URL}friends/${user.uid}/request`, { method: "POST" }).then(
      async (result) => {
        if (result.ok) {
          const request = await result.json()
          const tfriendList = new Map<string, Friendship>(friendList)
          tfriendList.set(request.uid, request)
          setFriendList(tfriendList)
        } else {
          updateErrorToast("could not add friend.")
        }
      },
    )
  }

  async function acceptFriendRequest(uid: string) {
    await fetch(`${API_URL}friends/${uid}/accept`, { method: "PUT" }).then(async (result) => {
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
    await fetch(`${API_URL}friends/${uid}`, { method: "DELETE" }).then((result) => {
      if (result.ok && user !== undefined) {
        const tfriendList = new Map<string, Friendship>(friendList)
        tfriendList.delete(createFriendPairing(uid, user.uid))
        setFriendList(tfriendList)
      } else {
        updateErrorToast("could not delete request.")
      }
    })
  }

  async function getFriends() {
    let tfriendList = new Map<string, Friendship>()
    await fetch(`${API_URL}friends`, { method: "GET" }).then(async (result) => {
      if (result.ok) {
        const { friends } = await result.json()
        console.log("getFriends()", friends)
        friends.forEach((friend: Friendship) => {
          tfriendList.set(friend.uid, friend)
        })
      } else {
        updateErrorToast("could not get friends.")
      }

      setFriendList(tfriendList)
    })
  }
}
