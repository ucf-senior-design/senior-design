import AirportShuttleIcon from "@mui/icons-material/AirportShuttle"
import {
  Button,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material"
import Link from "next/link"
import { useAuth } from "../../utility/hooks/authentication"
import { User as UserType } from "../../utility/types/user"

import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import AddIcon from "@mui/icons-material/Add"
import DashboardIcon from "@mui/icons-material/Dashboard"
import GroupsIcon from "@mui/icons-material/Groups"
import HomeIcon from "@mui/icons-material/Home"
import InfoIcon from "@mui/icons-material/Info"
import LoginIcon from "@mui/icons-material/Login"

const navItem1 = {
  id: 1,
  link: "/",
  name: "home",
  buttonLabel: "home button",
  icon: HomeIcon,
  iconLabel: "home icon",
}
const navItem2 = {
  id: 2,
  link: "/about",
  name: "about",
  buttonLabel: "about button",
  icon: InfoIcon,
  iconLabel: "about icon",
}
const navItem3 = {
  id: 3,
  link: "/auth/login",
  name: "login",
  buttonLabel: "login button",
  icon: LoginIcon,
  iconLabel: "login icon",
}
const navItem4 = {
  id: 4,
  link: "/auth/register",
  name: "new user",
  buttonLabel: "register button",
  icon: AddIcon,
  iconLabel: "register icon",
}

const authItem1 = {
  id: 0,
  link: "/settings/account",
  name: "my account",
  buttonLabel: "user account button",
  icon: AccountCircleIcon,
  iconLabel: "user account",
}

const authItem2 = {
  id: 1,
  link: "/dashboard",
  name: "dashboard",
  buttonLabel: "dashboard button",
  icon: DashboardIcon,
  iconLabel: "dashboard",
}
const authItem3 = {
  id: 2,
  link: "/settings/friends",
  name: "friends",
  buttonLabel: "friends list button",
  icon: GroupsIcon,
  iconLabel: "friends",
}

export const LoggedOutDrawer = ({
  user,
}: {
  user: (UserType & { didFinishRegister: boolean }) | undefined
}) => {
  const navItems = [navItem1, navItem2, navItem3, navItem4]
  const authNavItems = [authItem1, authItem2, authItem3]
  const { doLogout } = useAuth()

  return (
    <>
      <Grid container direction="row" sx={{ mb: 2, color: "white" }}>
        <IconButton sx={{ p: 0, pr: 1 }}>
          <AirportShuttleIcon sx={{ color: "white" }} />
        </IconButton>
        <Typography variant="h6">we-tinerary</Typography>
      </Grid>
      <Divider />
      <List>
        {user?.didFinishRegister ? (
          <>
            {authNavItems.map((item) => (
              <Link href={item.link} key={item.id} passHref>
                <ListItem component="a" disablePadding sx={{ color: "white" }}>
                  <ListItemButton aria-label={item.buttonLabel}>
                    <ListItemIcon aria-label={item.iconLabel}>
                      <item.icon sx={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
            <div>
              <Divider sx={{ marginTop: 4 }} />
              <Button
                variant="outlined"
                color="warning"
                sx={{ width: "100%" }}
                onClick={() => doLogout()}
              >
                Log Out
              </Button>
            </div>
          </>
        ) : (
          <>
            {navItems.map((item) => (
              <Link href={item.link} key={item.id} passHref>
                <ListItem component="a" disablePadding sx={{ color: "white" }}>
                  <ListItemButton aria-label={item.buttonLabel}>
                    <ListItemIcon aria-label={item.iconLabel}>
                      <item.icon sx={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </>
        )}
      </List>
    </>
  )
}

export default LoggedOutDrawer
