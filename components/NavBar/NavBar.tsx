import AirportShuttleIcon from "@mui/icons-material/AirportShuttle"
import MenuIcon from "@mui/icons-material/Menu"
import { Dropdown, MenuProps, Button as AButton } from "antd"
import {
  AppBar,
  Box,
  Button,
  ClickAwayListener,
  Drawer,
  Grow,
  IconButton,
  LinearProgress,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material"
import Router from "next/router"
import theme from "../../styles/theme/Theme"
import { useAuth } from "../../utility/hooks/authentication"
import useNavBar from "../../utility/hooks/navbar"
import { useScreen } from "../../utility/hooks/screen"
import Avatar from "../Avatar"
import LoggedOutDrawer from "./LoggedOutDrawer"
import { NavBarButton } from "./NavButton"

export default function NavBar({ path, loggedIn }: { path: string; loggedIn: boolean }) {
  const landingBackgroundColor = path === "/" ? "#5F9DF7" : "#3F3D56"
  const { user, doLogout } = useAuth()
  const { loading } = useScreen()

  const { handleDrawerToggle, setOpen, anchorRef, mobileOpen } = useNavBar()

  const { nav } = useScreen()

  const handleLogout = (): void => {
    doLogout()
  }

  const handleSettings = (): void => {
    Router.push("/settings/account")
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ m: 2 }}>
      <LoggedOutDrawer user={user} />
    </Box>
  )

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <a onClick={() => handleSettings()}> my account </a>,
    },
    {
      key: "2",
      label: <a onClick={() => handleLogout()}> logout </a>,
    },
  ]

  return (
    <>
      <nav aria-label="navigational bar">
        <AppBar
          position="static"
          sx={{
            boxShadow: "none",
            backgroundColor:
              nav.backgroundColor === undefined ? landingBackgroundColor : nav.backgroundColor,
          }}
        >
          <Toolbar
            style={{
              zIndex: 2,
              color: "landingTextColor",
            }}
          >
            <IconButton
              onClick={handleDrawerToggle}
              edge="start"
              aria-label="menu toggle"
              sx={{ display: { sm: "none" } }}
              color="inherit"
            >
              <MenuIcon sx={{ fontSize: "38px", color: "white" }} />
            </IconButton>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyItems: "center",
              }}
            >
              <AirportShuttleIcon
                sx={{
                  display: { xs: "none", sm: "block" },
                  marginRight: 1,
                  color: "white",
                }}
                color="inherit"
              />
              <Typography
                variant="h5"
                component="div"
                noWrap={true}
                color="white"
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", sm: "block" },
                  fontWeight: 700,
                }}
              >
                we-tinerary
              </Typography>
            </div>
            <Stack
              direction="row"
              spacing={2}
              sx={{
                display: { xs: "none", sm: "flex" },
                width: "100%",
                justifyContent: "end",
                textAlign: "right",
              }}
            >
              {loggedIn ? (
                <>
                  <NavBarButton path="/dashboard" text="dashboard" variant="text" />
                  <NavBarButton path="/settings/friends" text="friends" variant="text" />
                  <div onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
                    {anchorRef !== null && anchorRef !== undefined && (
                      <>
                        <Dropdown menu={{ items }} placement="bottom">
                          <AButton
                            style={{
                              backgroundColor: "transparent",
                              height: "60px",
                              border: "none",
                            }}
                          >
                            <Avatar
                              name={user?.name ?? ""}
                              image={user?.profilePic.length !== 0 ? user?.profilePic : undefined}
                            />
                          </AButton>
                        </Dropdown>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <NavBarButton path="/" text="home" variant="text" />
                  <NavBarButton path="/about" text="about" variant="text" />
                  <NavBarButton path="/auth/login" text="login" variant="contained" />
                  <NavBarButton path="/auth/register" text="register" variant="outlined" />
                </>
              )}
            </Stack>
          </Toolbar>
        </AppBar>
        <Box>
          <Drawer
            variant="temporary"
            PaperProps={{
              sx: {
                backgroundColor: "rgba(44, 42, 60, 0.79);",
                backdropFilter: "blur(8px)",
                padding: 2,
                width: "70vw",
                maxWidth: "300px",
              },
            }}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: false }}
          >
            {drawer}
          </Drawer>
        </Box>

        {loading ? (
          <LinearProgress color="inherit" sx={{ color: theme.palette.highlight.main }} />
        ) : (
          <></>
        )}
      </nav>
    </>
  )
}
