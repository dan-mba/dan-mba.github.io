import {List, ListItem, ListItemIcon, ListItemText, Typography} from "@mui/material";
import {PlaceOutlined} from "@mui/icons-material";
import {graphql} from "gatsby";
import {GatsbyImage, getImage} from "gatsby-plugin-image";
import {Link} from "gatsby-theme-material-ui";
import BackgroundImage from "../components/BackgroundImage";
import Layout from "../components/Layout";
import {
  styledSection, jobSection, jobText, paper, heroText, heroStyle, image,
  list, listIcon, listText, mapImage, link, title, titleUrl
} from "./index.module.css";
import PageData from "../data/index.yml";

const Paragraph = ({children}) => (
  <Typography variant="body1" paragraph style={{margin: '1em auto'}}>
    {children}
  </Typography>
);

const StyledSection = ({children}) => (
  <section className={styledSection}>
    {children}
  </section>
);

export default function Home({data}) {
  const heroImgData = getImage(data.hero);
  const mapImgData = getImage(data.map);

  return (
    <Layout title={PageData.title} description={PageData.description}>
      <BackgroundImage image={heroImgData} className={heroStyle}>
        <div className={heroText}>
          <Typography variant="h3">{PageData.name}</Typography>
          <Typography variant="h4">{PageData.jobtitle}</Typography>
          <Typography variant="h4">{PageData.langs}</Typography>
        </div>
      </BackgroundImage>
      <div className={paper}>
        <StyledSection>
          <Typography variant="h3" align="center">About Me</Typography>
          {PageData.about.map((item, i) => {
            return (<Paragraph key={i}>{item}</Paragraph>)
          })}
        </StyledSection>
        {PageData.jobHistory.map((d, i) => {
          const imgID = data.jobs.nodes.findIndex(job => job.original.src.includes(d.img));
          const InnerSection = ({d}) => {
            return (
              <>
                <div className={jobText}>
                  {!d.titleUrl ?
                    <Typography variant="h4" align="center" className={title}>{d.title}</Typography> :
                    <Link href={d.titleUrl} underline="none" className={link}
                      target="_blank" rel="noopener noreferrer"
                    >
                      <Typography variant="h4" align="center" className={titleUrl}>{d.title}</Typography>
                    </Link>
                  }
                  {d.p.map((text, count) => {
                    return (<Paragraph key={count}>{text}</Paragraph>)
                  })}
                </div>
                <GatsbyImage image={data.jobs.nodes[imgID]['gatsbyImageData']}
                  alt={d.imgAlt} className={image}
                />
              </>
            );
          };

          return (
            <section key={`paragraph-${i}`} className={`${styledSection} ${jobSection}`}>
              <InnerSection d={d} />
            </section>
          )
        })}
        <StyledSection>
          <GatsbyImage image={mapImgData} className={mapImage}
            alt="Map of Florida with Pin in Broward County"
          />
          <Paragraph>{PageData.residence}</Paragraph>
          <Paragraph>
            I am open to opportunities in the following locations:
          </Paragraph>
          <List dense className={list}>
            {PageData.openLocations.map((location, i) => {
              return (
                <ListItem key={i}>
                  <ListItemIcon className={listIcon}>
                    <PlaceOutlined color="secondary"/>
                  </ListItemIcon>
                  <ListItemText primary={location} className={listText}/>
                </ListItem>
              );
            })}
          </List>
        </StyledSection>
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query IndexPage {
    hero: file(relativePath: {eq: "binary.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: NONE, quality: 30)
      }
    }
    map: file(relativePath: {eq: "map.png" }) {
      childImageSharp {
        gatsbyImageData(width: 300, height: 300, layout: FIXED, placeholder: TRACED_SVG, quality: 70)
      }
    }
    jobs: allImageSharp(filter: {original: {src: {glob: "/static/index-*"}}}) {
      nodes {
        original {
          src
        }
        gatsbyImageData(width: 300, layout: CONSTRAINED, placeholder: TRACED_SVG, quality: 70)
      }
    }
  }
`
