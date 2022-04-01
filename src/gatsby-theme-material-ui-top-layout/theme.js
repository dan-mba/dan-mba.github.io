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
  pages: {
    index: {
      accentBackground: 'rgb(0, 23, 34)', // darken(theme.palette.secondary.main, 0.7)
      heroBackground: 'rgba(33, 33, 33, 0.6)', // alpha(theme.palette.primary.main,0.6)
      titleURLColor: 'rgb(81, 133, 159)', // lighten(theme.palette.secondary.main, 0.32)
    },
  },
});

export default theme;