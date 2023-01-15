import AirportShuttleIcon from "@mui/icons-material/AirportShuttle"
import MenuIcon from "@mui/icons-material/Menu"
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Stack,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material"
import Link from "next/link"
import * as React from "react"
import theme from "../styles/theme/Theme"
import LoggedOutDrawer from "./LoggedOutDrawer"

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [isLanding, setIsLanding] = React.useState<boolean>(false)

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState)
  }

  React.useEffect(() => {
    setIsLanding(window.location.pathname === "/")
  })

  const landingTextColor = isLanding ? "white" : undefined
  const landingBackgroundColor = isLanding ? "#5F9DF7" : undefined

  function NavBarButton({
    path,
    text,
    variant,
  }: {
    path: string
    text: string
    variant: "text" | "outlined" | "contained"
  }) {
    const extraStyles = isLanding
      ? {
          backgroundColor:
            variant === "text"
              ? landingBackgroundColor
              : variant !== "outlined"
              ? landingTextColor
              : undefined,
          color:
            variant === "text" || variant === "outlined"
              ? landingTextColor
              : landingBackgroundColor,
          borderColor: variant === "outlined" ? landingTextColor : undefined,
        }
      : {}
    return (
      <Link href={path} passHref>
        <Button color="secondary" variant={variant} aria-label={`${text}-button`} sx={extraStyles}>
          {text}
        </Button>
      </Link>
    )
  }
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ m: 2 }}>
      <LoggedOutDrawer />
    </Box>
  )

  return (
    <ThemeProvider theme={theme}>
      <nav aria-label="navigational bar">
        <AppBar position="static" color="secondary">
          <Toolbar
            style={{
              zIndex: 2,
              color: landingTextColor,
              backgroundColor: landingBackgroundColor,
            }}
          >
            <IconButton
              onClick={handleDrawerToggle}
              edge="start"
              aria-label="menu toggle"
              sx={{ display: { sm: "none" } }}
              color="inherit"
            >
              <MenuIcon sx={{ fontSize: "38px", color: landingTextColor }} />
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
                }}
                color="inherit"
              />
              <Typography
                variant="h5"
                component="div"
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", sm: "block" },
                  fontWeight: 700,
                }}
              >
                complanion
              </Typography>
            </div>
            <Stack
              direction="row"
              spacing={2}
              sx={{
                display: { xs: "none", sm: "block" },
                width: "100%",
                justifyContent: "end",
                textAlign: "right",
              }}
            >
              <NavBarButton path="/" text="home" variant="text" />
              <NavBarButton path="/About" text="about" variant="text" />
              <NavBarButton path="/Login" text="login" variant="contained" />
              <NavBarButton path="Register" text="register" variant="outlined" />
            </Stack>
          </Toolbar>
        </AppBar>
        <Box>
          <Drawer
            variant="temporary"
            PaperProps={{
              sx: {
                padding: 2,
                width: "70vw",
                maxWidth: "300px",
              },
            }}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
          >
            {drawer}
          </Drawer>
        </Box>
      </nav>
    </ThemeProvider>
  )
}

export default Navbar
