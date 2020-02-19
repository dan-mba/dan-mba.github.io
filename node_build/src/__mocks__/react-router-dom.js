/* eslint react/prop-types: 0, react/jsx-filename-extension:"off",
    react/prefer-stateless-function: 0 */
import React from 'react';

const rrd = require('react-router-dom');

class Link extends React.Component {
  render() {
    return <div className="test-link" {...this.props} />;
  }
}

rrd.Link = Link;

module.exports = rrd;
