import { Close } from "@mui/icons-material"
import { Card, Typography, Button, Grid } from "@mui/material"
import Trip from "../../pages/dashboard/trip/[[...params]]"
import { useAuth } from "../../utility/hooks/authentication"
import { useFriend } from "../../utility/hooks/friends"
import { Friendship } from "../../utility/types/user"
import Avatar from "../Avatar"

export default function Friend({ friendship }: { friendship: Friendship }) {
  const { removeFriendRequest } = useFriend()
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
