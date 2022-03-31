import {Typography} from "@mui/material";
import {getImage} from "gatsby-plugin-image";
import {graphql} from "gatsby";
import BackgroundImage from "../components/BackgroundImage";
import Layout from "../components/Layout";
import {heroStyle, heroText} from "./404.module.css";


export default function FourZeroFour({data}) {
  const heroImgData = getImage(data.hero);

  return (
    <Layout title="Page Not Found" description="Page Not Found">
      <BackgroundImage image={heroImgData} className={heroStyle}>
        <div className={heroText}>
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
