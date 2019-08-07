/*
 * Tabs/CodeTab.js
 *
 * The CodeTab component is displayed on the /code route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Chip, Card, CardHeader, CardContent, CardActions, Typography,
  Grid, Button, withStyles, withTheme } from '@material-ui/core';
import { redirect, selectCode } from '../redux/actions/code';
import styles from './CodeTabStyles';


/* Render array of sample apps */
class CodeTab extends React.Component {
  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
    this.showCode = this.showCode.bind(this);
  }

  showCode(url, isSource) {
    const { isIE11, dispatch, samples } = this.props;
    if (!isSource && !isIE11) {
      dispatch(redirect(samples.findIndex(samp => samp.url === url)));
    } else {
      const win = window.open(url, '_blank');
      if (win) win.focus();
    }
  }

  handleSelect(selected) {
    const { dispatch } = this.props;
    dispatch(selectCode(selected));
  }

  render() {
    let output = [];
    let sel = '';
    const { classes, theme, selected, redirId, libraries, samples, location } = this.props;

    const headerClass = {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    };

    if ((redirId !== '') && (location.pathname === '/code')) {
      window.location.href += '/selected';
    }

    if (redirId !== '') {
      return (
        <Redirect to={{
          pathname: '/sample',
          search: `?id=${redirId}`,
        }}
        />
      );
    }

    if (selected !== '') {
      output = samples.filter(samp => (
        samp.libraries.indexOf(selected) >= 0
      ));
    } else {
      output = samples;
    }

    output = output.map(samp => (
      <Grid item sm={12} lg={6} key={samp.title}>
        <Card className={classes.cardRoot}>
          <CardHeader
            title={samp.title}
            titleTypographyProps={{ color: 'inherit' }}
            classes={{
              root: classes.headerRoot,
              content: classes.headerContent,
            }}
            style={headerClass}
          />
          <CardContent classes={{ root: classes.cardContent }}>
            <Typography variant="body1">
              {samp.description}
            </Typography>
          </CardContent>
          <CardActions className={classes.actionRoot}>
            <Button
              size="small"
              variant="contained"
              onClick={() => this.showCode(samp.url, samp.newtab)}
            >
              App
            </Button>
            {!samp.apiname ? ''
              : (
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => this.showCode(samp.apisite, true)}
                >
                  Api
                </Button>
              )
            }
            <Button
              size="small"
              variant="contained"
              onClick={() => this.showCode(samp.source, true)}
            >
              Show Code
            </Button>
          </CardActions>
        </Card>
      </Grid>
    ));

    sel = (
      <div className={classes.sel}>
        { selected === '' ? ''
          : (
            <a
              href={libraries[selected].site}
              target="_blank"
              rel="noopener noreferrer"
              className={classes.selLink}
            >
              {libraries[selected].name}
            </a>
          )
        }
      </div>
    );

    return (
      <div className={classes.main}>
        <Selection
          handleClick={this.handleSelect}
          selected={selected}
          libraries={libraries}
          classes={classes}
        />
        {sel}
        <Grid
          container
          spacing={5}
          justify="center"
        >
          {output}
        </Grid>
      </div>
    );
  }
}

CodeTab.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  selected: PropTypes.string.isRequired,
  redirId: PropTypes.any.isRequired,
  libraries: PropTypes.object.isRequired,
  samples: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired,
  isIE11: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};


const Selection = ({ libraries, selected, classes, handleClick }) => {
  const chips = [];
  const libs = JSON.parse(JSON.stringify(libraries));

  chips.push(
    <Chip
      key="all"
      label="all"
      color="primary"
      variant={selected !== '' ? 'outlined' : 'default'}
      onClick={() => handleClick('')}
      className={classes.chip}
    />,
  );

  chips.push(...Object.keys(libs).map(lib => (
    <Chip
      key={lib}
      label={libs[lib].name}
      color="primary"
      variant={selected !== lib ? 'outlined' : 'default'}
      onClick={() => handleClick(lib)}
      className={classes.chip}
    />
  )));

  return (
    <div className={classes.selectors}>
      {chips}
    </div>
  );
};

Selection.propTypes = {
  libraries: PropTypes.object.isRequired,
  selected: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default connect(store => store.code)(withTheme(withStyles(styles)(CodeTab)));
