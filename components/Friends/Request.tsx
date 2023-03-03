import { Close } from "@mui/icons-material"
import { Button, Card, Typography } from "@mui/material"
import { useAuth } from "../../utility/hooks/authentication"
import { useFriend } from "../../utility/hooks/friends"
import { Friendship } from "../../utility/types/user"

export default function Request({ friend }: { friend: Friendship }) {
  const { removeFriendRequest } = useFriend()
  const { user } = useAuth()
  return (
    <Card>
      <Typography> {friend.uid} </Typography>
      <Button
        onClick={() =>
          removeFriendRequest(
            friend.pairing[0] === user?.uid ?? "" ? friend.pairing[1] : friend.pairing[0],
          )
        }
      >
        <Close />
      </Button>
    </Card>
  )
}
