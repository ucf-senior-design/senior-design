import { Typography, Box, Grid } from "@mui/material"
import { useFriend } from "../../utility/hooks/friends"
import { Friendship } from "../../utility/types/user"
import UserSearch from "../Form/UserSearch"
import Friend from "./Friend"
import Request from "./Request"
import React from "react"
import { list } from "firebase/storage"
import { Inbox, Message, People, Send } from "@mui/icons-material"
import theme from "../../styles/theme/Theme"
import { useAuth } from "../../utility/hooks/authentication"

type List = {
  accepted: Array<Friendship>
  request: Array<Friendship>
  pending: Array<Friendship>
}
export default function FriendList() {
  const [lists, setLists] = React.useState<List>({
    accepted: [],
    request: [],
    pending: [],
  })

  let { user } = useAuth()
  let { friendList, sendFriendRequest } = useFriend()
  React.useEffect(() => {
    if (friendList === undefined) {
      return
    }
    let accepted: Array<Friendship> = []
    let request: Array<Friendship> = []
    let pending: Array<Friendship> = []
    friendList.forEach((friend) => {
      if (friend.status.state === "accepted") {
        accepted.push(friend)
      } else if (user !== undefined && friend.status.modifier !== user.uid) {
        request.push(friend)
      } else {
        pending.push(friend)
      }
    })

    setLists({
      accepted: accepted,
      request: request,
      pending: pending,
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
    <Box padding="30px" display="flex" justifyItems="center" flexDirection="column" gap="10px">
      <UserSearch
        placeholder="add friend by username"
        handleFoundUser={async (user) => {
          sendFriendRequest(user)
        }}
        sx={{ maxWidth: "500px" }}
      />

      <Typography sx={{ alignItems: "center", display: "flex", gap: 2, ...$headerStyles }}>
        <Inbox sx={{ fontSize: "30px" }} /> Friend Requests : {lists.request.length}
      </Typography>
      <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
        <>
          {lists.request.map((value) => {
            return (
              <>
                <Request friendship={value} />
              </>
            )
          })}
        </>
      </Box>

      <Typography sx={{ alignItems: "center", display: "flex", gap: 2, ...$headerStyles }}>
        <People sx={{ fontSize: "30px" }} /> Friends : {lists.accepted.length}
      </Typography>
      <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
        <>
          {lists.accepted.map((value) => {
            return (
              <>
                <Friend friendship={value} />
              </>
            )
          })}
        </>
      </Box>

      <Typography sx={{ alignItems: "center", display: "flex", gap: 2, ...$headerStyles }}>
        <Send sx={{ fontSize: "30px" }} /> pending requests : {lists.pending.length}
      </Typography>
      <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
        <>
          {lists.pending.map((value) => {
            return (
              <>
                <Friend friendship={value} />
              </>
            )
          })}
        </>
      </Box>
    </Box>
  )
}

const $headerStyles: React.CSSProperties = {
  fontWeight: "650",
  fontSize: "30px",
  color: "#4A485F",
}
