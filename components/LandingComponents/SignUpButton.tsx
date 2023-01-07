import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Button, ThemeProvider } from '@mui/material';
import theme from '../../styles/theme/Theme';

export const SignUpButton = () => {
    return (
        <ThemeProvider theme={theme}>
            <Button variant='contained' endIcon={<ArrowForwardIcon />} color='secondary' sx={{borderRadius: 8}} aria-label="Sign up button">
                get started now
            </Button>
        </ThemeProvider>
    )
}

export default SignUpButton;