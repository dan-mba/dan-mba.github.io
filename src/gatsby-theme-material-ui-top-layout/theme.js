import {decomposeColor, recomposeColor, hexToRgb, rgbToHex, createTheme} from "@mui/material/styles";
import {darkScrollbar} from "@mui/material";

const fullBlue = (color) => {
  const sec = decomposeColor(color[0] === '#' ? hexToRgb(color) : color);
  const blue = 255 - sec.values[2];
  for(let i = 0; i < sec.values.length; i++) {
    sec.values[i] += blue;
  }
  return rgbToHex(recomposeColor(sec));
}

const lightTheme = createTheme({
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
    MuiChip: {
      variants: [
        {
          props: {size: 'large'},
          style: {fontSize: '1em'},
        }
      ]
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#e4e4e4',
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
      heroText: 'rgb(140, 217, 255)', 
      titleURLColor: 'rgb(81, 133, 159)', // lighten(theme.palette.secondary.main, 0.32)
    },
  },
  util: {
    lightBlue: fullBlue('#004d73')
  }
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#212121',
    },
    secondary: {
      main: lightTheme.util.lightBlue,
    },
    background: {
      paper: '#121212',
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
    MuiChip: {
      variants: [
        {
          props: {size: 'large'},
          style: {fontSize: '1em'},
        }
      ]
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#000',
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
      heroText: 'rgb(140, 217, 255)', 
      titleURLColor: 'rgb(81, 133, 159)', // lighten(theme.palette.secondary.main, 0.32)
    },
  },
  util: {
    lightBlue: fullBlue('#004d73')
  }
});

export default lightTheme;