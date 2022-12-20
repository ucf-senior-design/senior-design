import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import { Divider, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ThemeProvider, Typography } from '@mui/material';
import theme from '../../styles/theme/theme';

import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import LoginIcon from '@mui/icons-material/Login';

export const LoggedOutDrawer = () => {

    return (
        <ThemeProvider theme={theme}>
            <Grid container direction='row' sx={{mb:2}}>
                <IconButton color='inherit' sx={{p:0, pr:1}}>
                    <AirportShuttleIcon />
                </IconButton>
                <Typography variant='h6'>
                    complanion
                </Typography>
            </Grid>
            <Divider />
            <List>
                <ListItem component="a" href='/' disablePadding>
                    <ListItemButton aria-label='home button'>
                        <ListItemIcon aria-label='home icon'>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="home" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton aria-label='information button'>
                        <ListItemIcon aria-label='information icon'>
                            <InfoIcon />
                        </ListItemIcon>
                        <ListItemText primary="about" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton aria-label='login button'>
                        <ListItemIcon aria-label='login icon'>
                            <LoginIcon />
                        </ListItemIcon>
                        <ListItemText primary="login" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton aria-label='register button'>
                        <ListItemIcon aria-label='register icon'>
                            <AddIcon />
                        </ListItemIcon>
                        <ListItemText primary="new user" />
                    </ListItemButton>
                </ListItem>
            </List>
        </ThemeProvider>
    )
}

export default LoggedOutDrawer;