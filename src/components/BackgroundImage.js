import React from "react";
import {makeStyles} from "@material-ui/core/styles";

import {GatsbyImage} from "gatsby-plugin-image";

const useStyles = makeStyles({
  hero: {
    position: 'relative'
  },
  img:{
    height: '100%',
    width: '100%',
    overflow: 'hidden',
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
});

export default function BackgroundImage({image, className, children}) {
  const classes = useStyles();

  return (
    <section className={`${classes.hero} ${className}`}>
      <GatsbyImage className={classes.img} image={image} loading="eager" alt=""/>
      <div className={classes.heroBox}>
        {children}
      </div>
    </section>
  );
};
