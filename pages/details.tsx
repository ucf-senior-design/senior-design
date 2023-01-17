import { Button, TextField, ThemeProvider, useTheme } from '@mui/material';

export default function Details() {
  const theme = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <TextField label="Username" />
      <Button> Continue </Button>
    </ThemeProvider>
  );
}
