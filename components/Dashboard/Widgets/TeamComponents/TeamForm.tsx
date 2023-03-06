import { Box, Button, Chip, Divider, Paper, Stack, TextField } from "@mui/material"
import Typography from "@mui/material/Typography"
import theme from "../../../../styles/theme/Theme"
import Avatar from "../../../Avatar"
import UserSearch from "../../../Form/UserSearch"

export const TeamForm = ({ purpose }: { purpose: "create" | "view" }) => {
  const item1 = { username: "username", id: "123", name: "noriyuki" }
  const item2 = { username: "username2", id: "456", name: "minoru" }
  const example = [item1, item2]
  const teamname = "example team"

  const handleDelete = () => {
    console.info("You clicked the delete icon.")
  }

  return (
    <Paper
      elevation={3}
      style={{
        background: theme.palette.background.paper,
        padding: 20,
        paddingBottom: 20,
      }}
      sx={{
        width: { xs: "100%", md: "500px" },
      }}
    >
      <Box
        sx={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          padding: "30px",
          width: "100%",
        }}
      >
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

        <Typography
          style={{
            color: theme.palette.secondary.main,
            fontSize: 16,
            paddingBottom: 5,
            fontWeight: 500,
            textAlign: "left",
            width: "100%",
          }}
        >
          name
        </Typography>

        <TextField color="secondary" size="small" label={teamname} sx={{ flexGrow: 1 }} fullWidth />
        <br />

        <Typography
          style={{
            color: theme.palette.secondary.main,
            fontSize: 16,
            paddingBottom: 5,
            textAlign: "left",
            width: "100%",
            fontWeight: 500,
          }}
        >
          members
        </Typography>

        <Stack direction="row" spacing={1}>
          {example.map((item) => (
            <Chip
              key={item.id}
              variant="outlined"
              icon={<Avatar name={item.username} size={25} />}
              label={
                <Typography padding={1} fontSize={14}>
                  {" "}
                  {item.name}{" "}
                </Typography>
              }
              onDelete={handleDelete}
              size="medium"
              sx={{ paddingTop: 1.5, paddingBottom: 1.5, paddingLeft: 0.5, paddingRight: 0.5 }}
            />
          ))}
        </Stack>

        <br />
        <br />

        <Typography
          style={{
            color: theme.palette.secondary.main,
            fontSize: 16,
            fontWeight: 500,
            paddingBottom: 15,
          }}
        >
          add a friend
        </Typography>

        <UserSearch
          sx={{ width: "100%", marginBottom: "10px" }}
          handleFoundUser={(user) => console.log(user)}
        />

        <Divider sx={{ width: "100%", color: "#868686", borderBottomWidth: "30" }}>
          <Typography>OR</Typography>
        </Divider>

        <Typography
          style={{
            color: theme.palette.secondary.main,
            fontSize: 16,
            paddingBottom: 15,
            fontWeight: 500,
          }}
        >
          add by username:
        </Typography>

        <UserSearch
          sx={{ width: "100%", marginBottom: "10px" }}
          handleFoundUser={(user) => console.log(user)}
        />

        {purpose === "create" && (
          <Button
            variant="contained"
            color="primary"
            size="medium"
            sx={{ borderRadius: 1, width: "100%", fontSize: 16 }}
            aria-label="create team"
          >
            create team
          </Button>
        )}

        {purpose === "view" && (
          <>
            <Button
              variant="contained"
              color="primary"
              size="medium"
              sx={{ borderRadius: 1, width: "100%", fontSize: 16 }}
              aria-label="save changes"
            >
              save changes
            </Button>

            <Button
              variant="contained"
              color="error"
              size="medium"
              sx={{ borderRadius: 1, width: "100%", fontSize: 16 }}
              aria-label="delete team"
            >
              delete team
            </Button>
          </>
        )}
      </Box>
    </Paper>
  )
}
