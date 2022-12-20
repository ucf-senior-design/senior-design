import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import { AppBar, Button, IconButton, Stack, ThemeProvider, Toolbar, Typography } from '@mui/material';
import theme from '../../styles/theme/theme';

export const Navbar = () => {
    return (
        <ThemeProvider theme={theme}>
            <AppBar position='static' color="primary">
                <Toolbar>
                    <IconButton size='large' edge='start' color='inherit' aria-label='logo'>
                        <AirportShuttleIcon />
                    </IconButton>
                    <Typography variant='h6' component='div' sx={{ flexGrow:1 }}>
                        complanion
                    </Typography>
                    <Stack direction='row' spacing={2}>
                        <Button color='lace' variant='text' aria-label="home page button">home</Button>
                        <Button color='lace' variant='text' aria-label="about page button">about</Button>
                        <Button color='lace' variant='text' aria-label="login button">login</Button>
                        <Button color='lace' variant='contained' sx={{borderRadius: 8}} aria-label="register button">new user</Button>
                    </Stack>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    )
}

export default Navbar;