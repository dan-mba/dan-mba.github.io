import React from "react";
//import {Container} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles"
import {Helmet} from "react-helmet";
import {withPrefix} from "gatsby";
import NavBar from "./NavBar";

const useStyles = makeStyles({
  container: {
    width: '100%',
    boxSizing: 'border-box',
    margin: '0 auto 1em',
  }
});

export default function Layout({children}) {
  const classes = useStyles();

  return (
    <>
      <Helmet>
        <html lang="en" />
        <meta name="theme-color" content="#212121" />

        <meta property="author" content="Daniel Burkhardt" />
        <meta property="og:url" content="https://dan-mba.github.io/" />
        <meta property="og:type" content="website" />
        <meta name="google-site-verification" content="zqAgp2x3Kjf_R3oZBUqt9L-zco6Ma-o14sC2F2MFVvg" />
        
        <meta property="og:image" content={`${withPrefix('/')}img/gatsby-ogimg.png`} />
        <meta property="og:image:width" content="1280" />
        <meta property="og:image:height" content="640" />
        <meta property="og:image:alt" content="Screenshot of Daniel Burkhardt's Portfolio Website" />

        <link rel="apple-touch-icon" sizes="180x180" href={`${withPrefix('/')}img/apple-touch-icon.png`} />
        <link rel="icon" type="image/png" sizes="32x32" href={`${withPrefix('/')}img/favicon-32x32.png`} />
        <link rel="icon" type="image/png" sizes="16x16" href={`${withPrefix('/')}img/favicon-16x16.png`} />
        <link rel="manifest" href={`${withPrefix('/')}img/site.webmanifest`} />
        <link rel="mask-icon" href={`${withPrefix('/')}img/safari-pinned-tab.svg`} color="#5bbad5" />
        <link rel="shortcut icon" href={`${withPrefix('/')}img/favicon.ico`} />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="msapplication-config" content={`${withPrefix('/')}img/browserconfig.xml`} />
      </Helmet>
      <NavBar/>
      <div className={classes.container}>
        {children}
      </div>
    </>
  );
};
