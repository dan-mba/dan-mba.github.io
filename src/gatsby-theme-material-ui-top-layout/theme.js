import {decomposeColor, recomposeColor, hexToRgb, rgbToHex, experimental_extendTheme as extendTheme} from "@mui/material/styles";
import {darkScrollbar} from "@mui/material";

const fullBlue = (color) => {
  const sec = decomposeColor(color[0] === '#' ? hexToRgb(color) : color);
  const blue = 255 - sec.values[2];
  for(let i = 0; i < sec.values.length; i++) {
    sec.values[i] += blue;
  }
  return rgbToHex(recomposeColor(sec));
}

const theme = extendTheme({
  colorSchemes: {
    light: {
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
        accentBackground: 'rgb(0, 23, 34)', // darken(theme.palette.secondary.main, 0.7)
        heroText: 'rgb(140, 217, 255)', 
        titleURLColor: 'rgb(81, 133, 159)', // lighten(theme.palette.secondary.main, 0.32)
        starColor: 'rgb(0, 77, 115)'
      },
    },
    dark: {
      palette: {
        primary: {
          main: '#212121',
        },
        secondary: {
          main: fullBlue('#004d73'),
        },
        background: {
          paper: '#121212',
        },
        accentBackground: 'rgb(0, 23, 34)', // darken(theme.palette.secondary.main, 0.7)
        heroText: 'rgb(140, 217, 255)', 
        titleURLColor: 'rgb(81, 133, 159)', // lighten(theme.palette.secondary.main, 0.32)
        starColor: 'rgb(0, 77, 115)'
      },
    }
  },
  breakpoints: {
    values: {
      xs: 100,
      sm: 350,
      md: 500,
      lg: 800,
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
          '[data-mui-color-scheme="dark"] &': {
            backgroundColor: '#000',
          },
          fontSize: '0.875rem',
          lineHeight: '1.43',
          letterSpacing: '0.01071em'
        },
        html: darkScrollbar({track: '#212121', thumb: '#666'})
        
      },
    },
  }
});

export default theme;