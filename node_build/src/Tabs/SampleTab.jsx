/*
 * Tabs/SampleTab.js
 *
 * The SampleTab component is displayed on the /sample route
 * The id of the sample to desplay in the iframe is passed in
 * a query parameter
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useMediaQuery, makeStyles } from '@material-ui/core';
import SAMPLES from '../config/samples';
import { redirect } from '../redux/actions/code';

const useStyles = makeStyles({
  iframe: {
    width: '100%',
    maxWidth: '700px',
    margin: '0 auto',
    backgroundColor: 'transparent',
    display: 'block',
  },
  sample: {
    margin: '0 2px',
    padding: '75px 0 10px',
  },
  sampleSm: {
    margin: '0 7px',
    padding: '75px 0 10px',
  },
});

function MyIframe({ id }) {
  const classes = useStyles();

  return (
    <div className={useMediaQuery('(max-width:700px)') ? classes.sampleSm : classes.sample}>
      <iframe src={SAMPLES[id].url} title="Sample" className={classes.iframe} />
    </div>
  );
}

MyIframe.propTypes = {
  id: PropTypes.number.isRequired,
};

class SampleTab extends React.Component {
  componentDidMount() {
    /*
      Import for iframe-resizer failed, so included lib in html,
      which attaches the function to the window object.
    */
    window.iFrameResize(
      {
        heightCalculationMethod: 'documentElementScroll',
        warningTimeout: 0,
        bodyMargin: '0',
        bodyPadding: '0',
        checkOrigin: !window.location.href.includes('localhost'),
      }, 'iframe',
    );
  }

  render() {
    const { redirId, dispatch, location } = this.props;
    if (redirId !== '') {
      dispatch(redirect(''));
    }
    const id = parseInt(location.search.split('=')[1], 10);
    return (
      <MyIframe id={id} />
    );
  }
}

SampleTab.propTypes = {
  redirId: PropTypes.any.isRequired,
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

export default connect(store => store.code)(SampleTab);
