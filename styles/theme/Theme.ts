import { createTheme } from "@mui/material/styles"

const theme = createTheme({
  typography: {
    button: {
      textTransform: "none",
    },
  },
  palette: {
    mode: "light",
    background: {
      default: "#FFF", // white
    },
    primary: {
      light: "#5F9DF7",
      main: "#1746A2",
    },
    secondary: {
      main: "#F1F5F9",
      light: "#FFF",
      contrastText: "#3F3D56", // gray-ish blue
    },
    tertiary: {
      main: "#424155",
      contrastText: "#FFF7E9",
    },

    highlight: {
      main: "#FF731D",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        // The props to change the default for.
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
      styleOverrides: {
        root: ({ ownerState }) => ({
          boxShadow: "none",
          ...(ownerState.variant === "contained" &&
            (ownerState.color === "primary" || ownerState.color === "secondary") && {
              backgroundColor: theme.palette[ownerState.color].contrastText,
              color: theme.palette[ownerState.color].main,
            }),
          ...(ownerState.variant === "text" &&
            (ownerState.color === "primary" || ownerState.color === "secondary") && {
              backgroundColor: "none",
              color: theme.palette[ownerState.color].contrastText,
            }),
          ...(ownerState.variant === "outlined" &&
            (ownerState.color === "primary" || ownerState.color === "secondary") && {
              backgroundColor: "none",
              color: theme.palette[ownerState.color].contrastText,
              borderColor: theme.palette[ownerState.color].contrastText,
            }),
          ":hover": {
            boxShadow: "none",
          },
        }),
      },
    },
  },
})

export default theme
