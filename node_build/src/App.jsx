/*
 * App.jsx
 *
 * The App component wraps the components in the theme provider &
 * defines all the routes.
 */

import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import NavHeader from './NavHeader';
import HomeTab from './Tabs/HomeTab';
import SchoolTab from './Tabs/SchoolTab';
import ContactTab from './Tabs/ContactTab';
import WorkTab from './Tabs/WorkTab';
import CodeTab from './Tabs/CodeTab';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#212121',
    },
    secondary: {
      main: '#006db0',
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

const App = () => (
  <MuiThemeProvider theme={theme}>
    <Router>
      <div>
        <NavHeader />
        <Route exact path="/" component={HomeTab} />
        <Route path="/experience" component={WorkTab} />
        <Route path="/education" component={SchoolTab} />
        <Route path="/code" component={CodeTab} />
        <Route path="/contact" component={ContactTab} />
      </div>
    </Router>
  </MuiThemeProvider>
);

export default App;
