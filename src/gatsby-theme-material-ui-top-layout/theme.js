import {createTheme} from "@mui/material/styles";
import {darkScrollbar} from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: '#212121',
    },
    secondary: {
      main: '#004d73',
    },
    background: {
      paper: '#dbe3e8',
    },
  },
  breakpoints: {
    values: {
      xs: 100,
      sm: 350,
      md: 500,
      lg: 750,
      xl: 1200,
    },
  },
  spacing: (factor) => `${0.5 * factor}rem`,
  components: {
    MuiTypography: {
      styleOverrides: {
        body1: {
          maxWidth: '70ch',
        },
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#e0e0e0',
          fontSize: '0.875rem',
          lineHeight: '1.43',
          letterSpacing: '0.01071em'
        },
        html: darkScrollbar({track: '#212121', thumb: '#666'})
        
      },
    },
  },
});

export default theme;