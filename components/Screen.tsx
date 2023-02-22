import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import MenuIcon from '@mui/icons-material/Menu';
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
  MenuList, Paper, Popper,
  Stack,
  Toolbar,
  Typography
} from '@mui/material';
import Link from 'next/link';
import * as React from 'react';
import theme from '../styles/theme/Theme';
import { useScreen } from '../utility/hooks/screen';
import LoggedOutDrawer from './LoggedOutDrawer';

export default function Screen({
  children,
  path,
}: {
  path: string;
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { loading } = useScreen();
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  // TODO: Add logic for checking whether a user is logged in
  // Set this to true to see authenticated toolbar
  const [isAuth, setIsAuth] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleMenuToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleMenuClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setOpen(false);
  }

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false)
    }
  }

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }
    prevOpen.current = open;
  }, [open])

  const backgroundImage =
    path === '/About' ? "url('/Mountains.svg') 80% 80% " : undefined;
  const landingTextColor = path === '/' ? 'white' : undefined;
  const landingBackgroundColor = path === '/' ? '#5F9DF7' : undefined;

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
                noWrap={true}
                sx={{
                  flexGrow: 1,
                  display: { xs: 'none', sm: 'block' },
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
                display: { xs: 'none', sm: 'block' },
                width: '100%',
                justifyContent: 'end',
                textAlign: 'right',
              }}
            >
              {isAuth ? 
              <>
                <NavBarButton path="/dashboard/Overview" text="dashboard" variant="text"/>
                <NavBarButton path="/" text="teams" variant="text"/>
                <Button
                  ref={anchorRef}
                  color='secondary'
                  variant='outlined'
                  aria-label='user setings'
                  aria-controls={open ? 'composition-menu' : undefined}
                  aria-expanded={open ? 'true' : undefined}
                  area-haspopup='true'
                  onClick={handleMenuToggle}
                >
                  name stuff
                </Button>
                <Popper
                  open={open}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  placement='bottom-start'
                  transition
                  disablePortal
                >
                  {({ TransitionProps, placement}) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === 'bottom-start' ? 'left top' : 'left bottom'
                      }}
                      >
                        <Paper>
                          <ClickAwayListener onClickAway={handleMenuClose}>
                            <MenuList
                              autoFocusItem={open}
                              id="composition-menu"
                              aria-labelledby="composition-button"
                              onKeyDown={handleListKeyDown}
                            >
                              {/* TODO: Add logic */}
                              <MenuItem onClick={handleMenuClose}>my account</MenuItem>
                              <MenuItem onClick={handleMenuClose}>logout</MenuItem>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>

                    </Grow>
                  )}
                </Popper>
              </> :
              <>
                <NavBarButton path="/" text="home" variant="text" />
                <NavBarButton path="/about" text="about" variant="text" />
                <NavBarButton
                  path="/auth/login"
                  text="login"
                  variant="contained"
                />
                <NavBarButton
                  path="/auth/register"
                  text="register"
                  variant="outlined"
                />
              </>
              }
              
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

        {loading ? (
          <LinearProgress
            color="inherit"
            sx={{ color: theme.palette.highlight.main }}
          />
        ) : (
          <></>
        )}
      </nav>
      <div
        style={{
          height: '100vh',
          width: '100vw',
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
