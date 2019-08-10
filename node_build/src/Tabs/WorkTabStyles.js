/*
 * Tans/WorkTabStyles.js
 *
 * The styles constant used by the withStyles function for WorkTab
 */

const styles = {
  root: {
    width: '98%',
    margin: '0 auto',
    padding: '75px 0 10px',
  },
  list: {
    padding: '0 0 12px',
  },
  avatar: {
    width: '90px',
    height: '90px',
  },
  avatarRoot: {
    marginRight: '10px',
  },
  content: {
    flex: '0 0 auto',
    margin: '0 auto',
    textAlign: 'center',
  },
  header: {
    padding: '10px 1% 0',
  },
  title: {
    fontFamily: '"Roboto Condensed", "Helvetica", "Arial", sans-serif',
    fontWeight: '700',
    fontSize: '1.1rem',
    lineHeight: '1.3',
  },
  subheader: {
    fontFamily: '"Roboto Condensed", "Helvetica", "Arial", sans-serif',
    fontWeight: '400',
    fontSize: '1.0rem',
    lineHeight: '1.3',
    color: 'inherit',
  },
  jobDescription: {
    fontFamily: '"Roboto Condensed", "Helvetica", "Arial", sans-serif',
    fontWeight: '700',
    fontSize: '1.05rem',
    lineHeight: '1.3',
    flex: '1 1 auto',
  },
  expand: {
    transform: 'rotate(0deg)',
    padding: '0 8px',
    marginLeft: '0',
    transition: 'transform 250ms',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
    padding: '0 8px',
    marginLeft: '0',
    transition: 'transform 250ms',
  },
};

export default styles;
