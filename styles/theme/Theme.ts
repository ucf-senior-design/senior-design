import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        button: {
            textTransform: 'none'
        }
    },
    palette: {
        mode: 'light',
        background: {
            default: '#FFF7E9'
        },
        primary: {
            light: '#5F9DF7',
            main: '#1746A2',
        },
        secondary: {
            main: '#FFF7E9',
            contrastText: '#1746A2'
        },
        tertiary: {
            main: '#424155',
            contrastText: '#FFF7E9'
        },
        highlight: {
            main: '#FF731D',
        }
    }
})

export default theme;