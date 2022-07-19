import {Typography} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import {getImage} from "gatsby-plugin-image";
import {graphql} from "gatsby";
import BackgroundImage from "../components/BackgroundImage";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import PreloadImage from "../components/PreloadImage";
import theme from "../gatsby-theme-material-ui-top-layout/theme";

const heroStyle = {
  width: '100%',
  height: '30em'
};

const HeroText = styled('div') ({
  color: theme.palette.primary.contrastText,
  backgroundColor: alpha(theme.palette.primary.main,0.5),
  padding: '2px',
  textAlign: 'center',
  borderRadius: '5px'
});

export default function FourZeroFour({data}) {
  const heroImgData = getImage(data.hero);

  return (
    <Layout>
      <BackgroundImage image={heroImgData} style={heroStyle}>
        <HeroText>
          <Typography variant="h3">Page Not Found</Typography>
          <Typography variant="body1">Oops! The page you are looking for has been removed or relocated</Typography>
        </HeroText>
      </BackgroundImage>
    </Layout>
  );
}

export const Head = ({data}) => {
  const image = getImage(data.hero);
  return (
    <SEO title="Page Not Found" description="Page Not Found">
      <PreloadImage image={image} />
    </SEO>
  )
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
