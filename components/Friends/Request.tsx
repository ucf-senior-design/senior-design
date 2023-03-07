import { Close } from "@mui/icons-material"
import { Button, Card, Typography, Grid } from "@mui/material"
import { useAuth } from "../../utility/hooks/authentication"
import { useFriend } from "../../utility/hooks/friends"
import { Friendship } from "../../utility/types/user"
import Avatar from "../Avatar"

export default function Request({ friendship }: { friendship: Friendship }) {
  const { removeFriendRequest, acceptFriendRequest } = useFriend()
  const { user } = useAuth()
  return (
    <Card sx={{ margin: "10px", maxWidth: "400px", width: { xs: "100%", md: "40%" } }}>
      <Grid container direction="row" padding="20px">
        <Grid item xs={2} display="flex" alignItems="center" justifyContent="center">
          <Avatar
            name={friendship.friend.name ?? ""}
            image={
              friendship.friend.photoURL !== undefined ? friendship.friend.photoURL : undefined
            }
          />
        </Grid>
        <Grid item xs={6} display="flex" alignItems="center" justifyContent="center">
          <Typography fontWeight={"bold"} textAlign={"left"}>
            {" "}
            {friendship.friend.name}{" "}
          </Typography>
        </Grid>
        <Grid item xs={4} display="flex" gap="5px" alignItems="end" justifyContent="center">
          <Button
            variant="contained"
            onClick={() =>
              acceptFriendRequest(
                friendship.pairing[0] === user?.uid ?? ""
                  ? friendship.pairing[1]
                  : friendship.pairing[0],
              )
            }
          >
            accept
          </Button>
          <Button
            variant="outlined"
            onClick={() =>
              removeFriendRequest(
                friendship.pairing[0] === user?.uid ?? ""
                  ? friendship.pairing[1]
                  : friendship.pairing[0],
              )
            }
          >
            delete
          </Button>
        </Grid>
      </Grid>
    </Card>
  )
}
