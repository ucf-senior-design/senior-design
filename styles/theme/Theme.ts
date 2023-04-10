import { createTheme, Shadows } from "@mui/material/styles"

const theme = createTheme({
  shadows: Array(25).fill("none") as Shadows,
  typography: {
    button: {
      textTransform: "none",
    },
  },
  palette: {
    mode: "light",
    background: {
      default: "#EFEFEF", // white
    },
    primary: {
      contrastText: "#3F3D56",
      main: "#FFF",
      light: " v",
    },
    secondary: {
      main: "#3F3D56",
      light: "#DEDBFF",
      contrastText: "#FFF",
    },
    tertiary: {
      main: "#FF731D",
      contrastText: "#FFF",
      light: "#FF9250",
    },
    landing: {
      main: "#5F9DF7",
      contrastText: "#FFF",
      light: "#A9CCFF",
    },

    highlight: {
      main: "#FF731D",
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          textTransform: "lowercase",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          textTransform: "lowercase",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        // The props to change the default for.
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
      styleOverrides: {
        root: ({ ownerState }) => ({
          boxShadow: "none",
          marginTop: 3,
          marginBottom: 3,
          ...(ownerState.variant === "contained" &&
            (ownerState.color === "primary" ||
              ownerState.color === "secondary" ||
              ownerState.color === "tertiary" ||
              ownerState.color === "landing") && {
              backgroundColor: theme.palette[ownerState.color].contrastText,
              color: theme.palette[ownerState.color].main,
              ":hover": {
                boxShadow: "none",
                backgroundColor: theme.palette[ownerState.color].light,
              },
            }),
          ...(ownerState.variant === "text" &&
            (ownerState.color === "primary" ||
              ownerState.color === "secondary" ||
              ownerState.color === "tertiary" ||
              ownerState.color === "landing") && {
              backgroundColor: "none",
              color: theme.palette[ownerState.color].contrastText,
              ":hover": {
                boxShadow: "none",
                opacity: 0.75,
              },
            }),
          ...(ownerState.variant === "outlined" &&
            (ownerState.color === "primary" ||
              ownerState.color === "secondary" ||
              ownerState.color === "tertiary" ||
              ownerState.color === "landing") && {
              backgroundColor: "none",
              color: theme.palette[ownerState.color].contrastText,
              borderColor: theme.palette[ownerState.color].contrastText,
            }),
        }),
      },
    },
  },
})

export default theme
