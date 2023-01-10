
import { Button, ThemeProvider } from '@mui/material';
import Link from 'next/link';
import theme from '../../styles/theme/Theme';

export const LoginButton = () => {
    return (
        <ThemeProvider theme={theme}>
            <Link href='/' passHref>
                <Button variant='contained' color='tertiary' sx={{borderRadius: 1}} aria-label="Sign up button">
                    sign in
                </Button>
            </Link>
        </ThemeProvider>
    )
}

export default LoginButton;