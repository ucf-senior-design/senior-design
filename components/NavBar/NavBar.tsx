import { Person } from "@mui/icons-material"
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle"
import MenuIcon from "@mui/icons-material/Menu"
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
import React from "react"
import theme from "../../styles/theme/Theme"
import { useAuth } from "../../utility/hooks/authentication"
import useNavBar from "../../utility/hooks/navbar"
import { useScreen } from "../../utility/hooks/screen"
import LoggedOutDrawer from "./LoggedOutDrawer"
import { NavBarButton } from "./NavButton"

export default function NavBar({ path }: { path: string }) {
  const landingTextColor = path === "/" ? "white" : ""
  const landingBackgroundColor = path === "/" ? "#5F9DF7" : "#3F3D56"
  const { user, doLogout } = useAuth()
  const { loading } = useScreen()
  const { updateErrorToast } = useScreen()
  const [username, setUsername] = React.useState("")

  const { handleListKeyDown, handleDrawerToggle, setOpen, anchorRef, open, mobileOpen } =
    useNavBar()

  const { nav } = useScreen()

  const handleLogout = (): void => {
    doLogout()
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ m: 2 }}>
      <LoggedOutDrawer user={user} />
    </Box>
  )

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
              {user !== undefined && user?.didFinishRegister ? (
                <>
                  {/* TODO: add correct pages once they have been created */}
                  <NavBarButton path="/dashboard" text="dashboard" variant="text" />
                  <NavBarButton path="/teams" text="teams" variant="text" />
                  <div onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
                    <Button
                      ref={anchorRef}
                      color="secondary"
                      variant="outlined"
                      aria-label={"user"}
                      aria-controls={open ? "composition-menu" : undefined}
                      aria-expanded={open ? "true" : undefined}
                      area-haspopup="true"
                    >
                      <Person sx={{ color: "white" }} />
                    </Button>
                    <Popper
                      open={open}
                      anchorEl={anchorRef.current}
                      role={undefined}
                      placement="bottom-start"
                      transition
                      disablePortal
                    >
                      {({ TransitionProps, placement }) => (
                        <Grow
                          {...TransitionProps}
                          style={{
                            transformOrigin:
                              placement === "bottom-start" ? "left top" : "left bottom",
                          }}
                        >
                          <Paper>
                            <ClickAwayListener onClickAway={() => setOpen(false)}>
                              <MenuList
                                autoFocusItem={open}
                                id="composition-menu"
                                aria-labelledby="composition-button"
                                onKeyDown={handleListKeyDown}
                              >
                                {/* TODO: Add logic for settings page*/}
                                {/* <MenuItem onClick={handleMenuClose}>my account</MenuItem> */}
                                <MenuItem onClick={(e) => handleLogout()}>logout</MenuItem>
                              </MenuList>
                            </ClickAwayListener>
                          </Paper>
                        </Grow>
                      )}
                    </Popper>
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
