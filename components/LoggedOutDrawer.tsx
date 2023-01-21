import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import {
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import Link from 'next/link';

import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import LoginIcon from '@mui/icons-material/Login';

const navItem1 = {
  id: 1,
  link: '/',
  name: 'home',
  buttonLabel: 'home button',
  icon: HomeIcon,
  iconLabel: 'home icon',
};
const navItem2 = {
  id: 2,
  link: '/About',
  name: 'about',
  buttonLabel: 'about button',
  icon: InfoIcon,
  iconLabel: 'about icon',
};
const navItem3 = {
  id: 3,
  link: '/Login',
  name: 'login',
  buttonLabel: 'login button',
  icon: LoginIcon,
  iconLabel: 'login icon',
};
const navItem4 = {
  id: 4,
  link: '/Register',
  name: 'new user',
  buttonLabel: 'register button',
  icon: AddIcon,
  iconLabel: 'register icon',
};

export const LoggedOutDrawer = () => {
  const navItems = [navItem1, navItem2, navItem3, navItem4];

  return (
    <>
      <Grid container direction="row" sx={{ mb: 2 }}>
        <IconButton color="inherit" sx={{ p: 0, pr: 1 }}>
          <AirportShuttleIcon />
        </IconButton>
        <Typography variant="h6">complanion</Typography>
      </Grid>
      <Divider />
      <List>
        {navItems.map((item) => (
          <Link href={item.link} key={item.id} passHref>
            <ListItem component="a" disablePadding color="primary">
              <ListItemButton aria-label={item.buttonLabel}>
                <ListItemIcon aria-label={item.iconLabel}>
                  <item.icon color="inherit" />
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </>
  );
};

export default LoggedOutDrawer;
