// This is for adding custom colors that are not primary and secondary
// If you want to add more colors, update the definitions here like so
import '@mui/material/styles';

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    lace: Palette['primary'];
    independence: Palette['primary'];
  }
  interface PaletteOptions {
    lace: PaletteOptions['primary'];
    independence: PaletteOptions['primary'];
  }
}

// If you want to add a custom color to a button, make sure to update the TS definitions for the button component as well
declare module "@mui/material/Button" {
    interface ButtonPropsColorOverrides {
      lace: true;
      independence: true;
    }
}