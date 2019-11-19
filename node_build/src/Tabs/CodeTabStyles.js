/*
 * Tabs/CodeTabStyles.js
 *
 * The styles constant used by the withStyles function for CodeTab
 */

const styles = {
  main: {
    padding: '75px 20px 10px',
    margin: '0 auto',
  },
  chip: {
    margin: '1%',
  },
  cardRoot: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  headerRoot: {
    justifyContent: 'center',
    padding: '5px',
  },
  headerContent: {
    flex: 'none',
  },
  cardContent: {
    padding: '5px',
    height: '100%',
  },
  actionRoot: {
    justifyContent: 'space-between',
  },
  selectors: {
    margin: '0 auto 20px',
    padding: '0 1%',
    maxWidth: '600px',
    display: 'flex',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    backgroundColor: '#e0e0e0',
    borderRadius: '5px',
    boxShadow: '2px 2px 2px #b0b0b0',
  },
  sel: {
    margin: '0 0 30px',
    minHeight: '1px',
    fontSize: '2.5em',
    fontFamily: '"Roboto Condensed", sans-serif',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  selLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
};

export default styles;
