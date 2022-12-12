import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        button: {
            textTransform: 'none'
        }
    },
    palette: {
        background: {
            default: '#FFF7E9'
        },
        primary: {
            light: '#5F9DF7',
            main: '#1746A2',
        },
        secondary: {
            main: '#FF731D'
        },
        lace: {
            main: '#FFF7E9',
            contrastText: '#1746A2'
        },
        independence: {
            main: '#424155',
            contrastText: '#FFF7E9'
        }
    }
})

export default theme;