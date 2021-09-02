import React from "react";
import {List, ListItem, ListItemIcon, ListItemText, Typography, useMediaQuery} from "@material-ui/core";
import {PlaceOutlined} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import {alpha, darken, lighten} from "@material-ui/core/styles/colorManipulator";
import {graphql} from "gatsby";
import {Helmet} from "react-helmet";
import {GatsbyImage, getImage} from "gatsby-plugin-image";
import {Link} from "gatsby-theme-material-ui";
import BackgroundImage from "../components/BackgroundImage";
import Layout from "../components/Layout";
import theme from "../gatsby-theme-material-ui-top-layout/theme";
import PageData from "../data/index.yml";

const useStyles = makeStyles({
  paper: {
    backgroundColor: theme.palette.background.paper,
    margin: '0',
    padding: '2em 0 1em',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'

  },
  hero: {
    width: '100%',
    height: '23em'
  },
  heroText: {
    color: theme.palette.primary.contrastText,
    backgroundColor: alpha(theme.palette.primary.main,0.6),
    padding: '2px',
    textAlign: 'center',
    borderRadius: '5px'
  },
  section: {
    padding: '1em min(2%, 2em)',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  jobSection: {
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.up(900)]: {
      minHeight: '350px',
      flexDirection: 'row',
      justifyContent: 'space-around',
    }
  },
  jobSectionText: {
    padding: '0 1em',
  },
  img: {
    width: '300px',
    flex: 'none'
  },
  accent: {
    color: theme.palette.secondary.contrastText,
    backgroundColor: darken(theme.palette.secondary.main, 0.7),
    [theme.breakpoints.up(900)]: {
      flexDirection: 'row-reverse',
    },
  },
  title: {
    fontWeight: 'bold',
  },
  titleUrl: {
    color: lighten(theme.palette.secondary.main, 0.32),
    fontWeight: 'bold',
  },
  link: {
    '& h4:hover': {
      textDecoration: 'underline'
    }
  },
  p: {
    margin: '1em auto'
  },
  map: {
    alignSelf: 'center',
    margin: '1em 0 .5em'
  },
  list: {
    maxWidth: '70ch',
    margin: '0 auto',
    paddingTop: '0'
  },
  listIcon: {
    minWidth: 'unset',
    paddingRight: '1em'
  },
  listText: {
    margin: '0'
  },
  listType: {
    fontSize: '1rem',
  }
});

export default function Home({data}) {
  const classes = useStyles();

  const isWide = useMediaQuery(theme.breakpoints.up(900),{noSsr: true});
  const heroImgData = getImage(data.hero);
  const mapImgData = getImage(data.map);

  return (
    <Layout>
      <Helmet>
        <title>{PageData.title}</title>
        <meta property="og:title" content={PageData.title} />
        <meta name="description" content={PageData.description} />
        <meta name="og:description" content={PageData.description} />
      </Helmet>
      <BackgroundImage className={classes.hero} image={heroImgData}>
        <div className={classes.heroText}>
          <Typography variant="h3">{PageData.name}</Typography>
          <Typography variant="h4">{PageData.jobtitle}</Typography>
          <Typography variant="h4">{PageData.langs}</Typography>
        </div>
      </BackgroundImage>
      <div className={classes.paper}>
        <section className={classes.section}>
            <Typography variant="h3" align="center">About Me</Typography>
            {PageData.about.map((item, i) => {
              return (<Typography variant="body1" key={i} className={classes.p}>{item}</Typography>)
            })}
        </section>
        {PageData.jobHistory.map((d, i) => {
          const imgID = data.jobs.nodes.findIndex(job => job.original.src.includes(d.img));

          return (
            <section key={`paragraph-${i}`} className={
              i%2 === 0 ? `${classes.section} ${classes.jobSection} ${classes.accent}`:
              `${classes.section} ${classes.jobSection}`
            }>
              <div className={classes.jobSectionText}>
                {!d.titleUrl ? <Typography variant="h4" align="center" className={classes.title}>{d.title}</Typography> :
                  <Link href={d.titleUrl} underline="none" className={classes.link}
                    target="_blank" rel="noopener noreferrer"
                  >
                    <Typography variant="h4" align="center" className={classes.titleUrl}>{d.title}</Typography>
                  </Link>
                }
                {d.p.map((text, count) => {
                  return (<Typography variant="body1" className={classes.p} key={count}>{text}</Typography>)
                })}
              </div>
              {!isWide ? null : 
                <div className={classes.img}>
                  <GatsbyImage image={data.jobs.nodes[imgID]['gatsbyImageData']} alt={d.imgAlt} />
                </div>
              }
            </section>
          );
        })}
        <section className={classes.section}>
          <GatsbyImage image={mapImgData} className={classes.map}
            alt="Map of Florida with Pin in Broward County"
          />
          <Typography variant="body1" className={classes.p}>
            {PageData.residence}
          </Typography>
          <Typography variant="body1" className={classes.p}>
            I am open to opportunities in the following locations:
          </Typography>
          <List dense classes={{root: classes.list}}>
            {PageData.openLocations.map((location, i) => {
              return (
                <ListItem key={i}>
                  <ListItemIcon classes={{root: classes.listIcon}}><PlaceOutlined color="secondary"/></ListItemIcon>
                  <ListItemText primary={location} classes={{root: classes.listText, primary: classes.listType}}/>
                </ListItem>
              );
            })}
          </List>
        </section>
      </div>
    </Layout>
  );
};

export const pageQuery = graphql`
  query IndexPage {
    hero: file(relativePath: {eq: "binary.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: NONE, quality: 50)
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
