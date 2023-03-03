import { Typography, Box } from "@mui/material"
import { useFriend } from "../../utility/hooks/friends"
import { Friendship } from "../../utility/types/user"
import UserSearch from "../Form/UserSearch"
import Accepted from "./Accepted"
import Request from "./Request"
import React from "react"
import { list } from "firebase/storage"

type List = {
  accepted: Array<Friendship>
  request: Array<Friendship>
}
export default function FriendList() {
  const [lists, setLists] = React.useState<List>({
    accepted: [],
    request: [],
  })

  let { friendList, sendFriendRequest } = useFriend()
  React.useEffect(() => {
    if (friendList === undefined) {
      return
    }
    let accepted: Array<Friendship> = []
    let request: Array<Friendship> = []
    friendList.forEach((friend) => {
      if (friend.status.state === "accepted") {
        accepted.push(friend)
      } else {
        request.push(friend)
      }
    })
    console.log(friendList, accepted, request)
    setLists({
      accepted: accepted,
      request: request,
    })
  }, [friendList])

  if (friendList === undefined) {
    return (
      <>
        {" "}
        <Typography> Loading </Typography>
      </>
    )
  }

  return (
    <>
      <UserSearch
        placeholder="add friend by username"
        handleFoundUser={async (user) => {
          sendFriendRequest(user)
        }}
      />
      <Typography> Friends </Typography>
      <Box>
        <>
          {lists.accepted.map((value) => {
            return (
              <>
                <Accepted friend={value} />
              </>
            )
          })}
        </>
      </Box>
      <Typography> Friend Requests </Typography>
      <Box>
        <>
          {lists.request.map((value) => {
            return (
              <>
                <Request friend={value} />
              </>
            )
          })}
        </>
      </Box>
    </>
  )
}
