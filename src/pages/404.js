import React from "react";
import {Typography} from "@mui/material";
import { alpha } from "@mui/material/styles";
import makeStyles from '@mui/styles/makeStyles';
import {getImage} from "gatsby-plugin-image";
import {graphql} from "gatsby";
import BackgroundImage from "../components/BackgroundImage";
import Layout from "../components/Layout";
import theme from "../gatsby-theme-material-ui-top-layout/theme";


const useStyles = makeStyles({
  hero: {
    width: '100%',
    height: '30em'
  },
  heroText: {
    color: theme.palette.primary.contrastText,
    backgroundColor: alpha(theme.palette.primary.main,0.5),
    padding: '2px',
    textAlign: 'center',
    borderRadius: '5px'
  },
});

export default function FourZeroFour({data}) {
  const classes = useStyles();
  const heroImgData = getImage(data.hero);

  return (
    <Layout title="Page Not Found" description="Page Not Found">
      <BackgroundImage className={classes.hero} image={heroImgData}>
        <div className={classes.heroText}>
          <Typography variant="h3">Page Not Found</Typography>
          <Typography variant="body1">Oops! The page you are looking for has been removed or relocated</Typography>
        </div>
      </BackgroundImage>
    </Layout>
  );
}

export const pageQuery = graphql`
  query FourZeroFourPage {
    hero: file(relativePath: {eq: "binary.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: NONE, quality: 50)
      }
    }
  }
`
