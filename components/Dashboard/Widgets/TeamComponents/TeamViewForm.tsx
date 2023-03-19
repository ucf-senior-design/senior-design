import PersonOutlineIcon from "@mui/icons-material/PersonOutline"
import { Button, Paper, Stack } from "@mui/material"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Divider from "@mui/material/Divider"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import theme from "../../../../styles/theme/Theme"

export const TeamView = () => {
  const item1 = { username: "username", id: "123", name: "noriyuki" }
  const item2 = { username: "username2", id: "456", name: "minoru" }
  const example = [item1, item2]
  const teamname = "example team"

  return (
    <Paper
      elevation={3}
      style={{
        maxWidth: "900px",
        width: "80vw",
        background: theme.palette.background.paper,
        padding: 20,
        paddingBottom: 20,
      }}
    >
      <Grid container direction="column" justifyContent="center" alignItems="center" display="flex">
        <Typography
          variant="h4"
          style={{
            fontWeight: 500,
            color: theme.palette.secondary.main,
            padding: 5,
          }}
        >
          {teamname}
        </Typography>
        <Divider />
        <Typography
          variant="h5"
          style={{
            fontWeight: 300,
            color: theme.palette.secondary.main,
          }}
        >
          members:
        </Typography>
        <form>
          <Stack direction="row" justifyContent="center" alignItems="center" display="flex">
            {example.map((item) => (
              <Paper
                key={item.id}
                square={false}
                style={{
                  display: "flex",
                  borderRadius: 5,
                  borderColor: "#3f3e55",
                  borderStyle: "solid",
                  borderWidth: 1.5,
                  width: "100%",
                  padding: 10,
                  margin: 5,
                }}
              >
                <Card sx={{ minWidth: 200 }}>
                  <CardContent>
                    <Grid
                      container
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                      display="flex"
                    >
                      <Typography sx={{ fontSize: 17, paddingBottom: 1 }} color="#403c54">
                        <Grid container direction="row" display="flex">
                          <PersonOutlineIcon />
                          &nbsp;&nbsp;{item.name}
                        </Grid>
                      </Typography>
                      <Divider variant="middle" />

                      <Typography sx={{ fontSize: 14 }} color="#403c54">
                        {item.username}
                      </Typography>
                    </Grid>
                  </CardContent>
                </Card>
              </Paper>
            ))}
          </Stack>
        </form>
        <p>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ borderRadius: 1 }}
            aria-label="edit team"
          >
            {" "}
            edit team
          </Button>
        </p>
      </Grid>
    </Paper>
  )
}
