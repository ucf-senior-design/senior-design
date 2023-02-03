import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import * as React from 'react';
import theme from '../styles/theme/Theme';
import LoggedOutDrawer from './LoggedOutDrawer';

export default function Screen({
  children,
  path,
}: {
  path: string;
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const landingTextColor = path === '/' ? 'white' : undefined;
  const landingBackgroundColor = path === '/' ? '#5F9DF7' : undefined;
  const backgroundImage =
    path === '/About' ? "url('/Mountains.svg') 80% 80% " : undefined;
  function NavBarButton({
    path,
    text,
    variant,
  }: {
    path: string;
    text: string;
    variant: 'text' | 'outlined' | 'contained';
  }) {
    return (
      <Link href={path} passHref>
        <Button
          color={path === '/' ? 'landing' : 'secondary'}
          variant={variant}
          aria-label={`${text}-button`}
        >
          {text}
        </Button>
      </Link>
    );
  }
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ m: 2 }}>
      <LoggedOutDrawer />
    </Box>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <nav aria-label="navigational bar">
        <AppBar position="static" color="secondary" sx={{ boxShadow: 'none' }}>
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
              sx={{ display: { sm: 'none' } }}
              color="inherit"
            >
              <MenuIcon sx={{ fontSize: '38px', color: landingTextColor }} />
            </IconButton>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyItems: 'center',
              }}
            >
              <AirportShuttleIcon
                sx={{
                  display: { xs: 'none', sm: 'block' },
                  marginRight: 1,
                }}
                color="inherit"
              />
              <Typography
                variant="h5"
                component="div"
                sx={{
                  flexGrow: 1,
                  display: { xs: 'none', sm: 'block' },
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
                display: { xs: 'none', sm: 'block' },
                width: '100%',
                justifyContent: 'end',
                textAlign: 'right',
              }}
            >
              <NavBarButton path="/" text="home" variant="text" />
              <NavBarButton path="/About" text="about" variant="text" />
              <NavBarButton
                path="/Auth/Login"
                text="login"
                variant="contained"
              />
              <NavBarButton
                path="/Auth/Register"
                text="register"
                variant="outlined"
              />
            </Stack>
          </Toolbar>
        </AppBar>
        <Box>
          <Drawer
            variant="temporary"
            PaperProps={{
              sx: {
                backgroundColor: 'rgba(44, 42, 60, 0.79);',
                backdropFilter: 'blur(8px)',
                padding: 2,
                width: '70vw',
                maxWidth: '300px',
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
      <div
        style={{
          height: '100%',
          width: '100%',
          padding: 10,
          backgroundColor: theme.palette.background.default,
          background: backgroundImage,
        }}
      >
        {children}
      </div>
    </div>
  );
}
