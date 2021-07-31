import { createTheme } from "@material-ui/core/styles";

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
  overrides: {
    MuiTypography: {
      body1: {
        maxWidth: '70ch',
      },
    },
    MuiCssBaseline: {
      '@global': {
        body: {
          backgroundColor: '#e0e0e0'
        },
      },
    },
  },
});

export default theme;