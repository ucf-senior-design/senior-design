import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, Button, Drawer, IconButton, Stack, ThemeProvider, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';
import * as React from 'react';
import theme from '../styles/theme/Theme';
import LoggedOutDrawer from './LoggedOutDrawer';

export const Navbar = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    }

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{m: 2}}>
            <LoggedOutDrawer />
        </Box>
    )

    return (
        <ThemeProvider theme={theme}>
            <nav aria-label='navigational bar'>
                <AppBar position='static' color="primary">
                    <Toolbar>
                        <IconButton onClick={handleDrawerToggle} edge='start' aria-label="menu toggle" sx={{display: {sm: 'none'}}} color='inherit'>
                            <MenuIcon />
                        </IconButton>
                        <IconButton size='large' edge='start' color='inherit'
                        aria-label='logo' sx={{ display: { xs: 'none', sm: 'block' } }}>
                            <AirportShuttleIcon />
                        </IconButton>
                        <Typography variant='h6' component='div' sx={{ flexGrow:1, display: { xs: 'none', sm: 'block' } }}>
                            complanion
                        </Typography>
                        <Stack direction='row' spacing={2} sx={{ display: { xs: 'none', sm: 'block' } }}>
                            <Link href='/' passHref>
                                <Button color='secondary' variant='text' aria-label="home page button">home</Button>   
                            </Link>
                            <Link href='/About' passHref>
                                <Button color='secondary' variant='text' aria-label="about page button">about</Button>
                            </Link>
                            <Button color='secondary' variant='text' aria-label="login button">login</Button>
                            <Button color='secondary' variant='contained' sx={{borderRadius: 8}} aria-label="register button">new user</Button>
                        </Stack>
                    </Toolbar>
                </AppBar>
                <Box>
                    <Drawer variant='temporary' PaperProps={{sx: {backgroundColor: "secondary.main", color: "primary.main", }}} open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{keepMounted:true}}>
                        {drawer}
                    </Drawer>
                </Box>
            </nav>
        </ThemeProvider>
    )
}

export default Navbar;