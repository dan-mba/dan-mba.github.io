import React from "react";
import {makeStyles} from "@material-ui/core/styles";

import Img from "gatsby-image";

const useStyles = makeStyles(theme => ({
  hero: {
    position: 'relative'
  },
  img:{
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  heroBox: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10
  },
}));

export default function BackgroundImage({fluid, className, children}) {
  const classes = useStyles();

  return (
    <section className={`${classes.hero} ${className}`}>
      <Img className={classes.img} fluid={fluid} />
      <div className={classes.heroBox}>
        {children}
      </div>
    </section>
  );
};
