import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
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
  typography: {
    useNextVariants: true,
  },
  breakpoints: {
    values: {
      sm: 350,
      md: 500,
      lg: 750,
      xl: 1000,
    },
  },
  overrides: {
    MuiTypography: {
      body1: {
        'line-height': 1.3,
      },
    },
  },
});

export default theme;