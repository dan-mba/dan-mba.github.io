import {Suspense} from "react";
import {Link, List, ListItem, ListItemIcon, ListItemText, Typography} from "@mui/material";
import {PlaceOutlined} from "@mui/icons-material";
import {styled} from "@mui/material/styles";
import {graphql} from "gatsby";
import {GatsbyImage, StaticImage, getImage} from "gatsby-plugin-image";
import BackgroundImage from "../components/BackgroundImage";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import PreloadImage from "../components/PreloadImage";
import theme from "../gatsby-theme-material-ui-top-layout/theme";
import PageData from "../data/index.yml";

const PType = styled(Typography)({
  margin: '1rem auto',
});

const Paragraph = ({children}) => (
  <PType variant="body1" paragraph>
    {children}
  </PType>
);

const StyledSection = styled('section')({
  padding: '1rem min(2vw, 2em)',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const JobSection = styled(StyledSection)({
  alignItems: 'center',
  justifyContent: 'center',
  '&:nth-of-type(2n)': {
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.pages.index.accentBackground,
  },
  [theme.breakpoints.up(900)]: {
    minHeight: '350px',
    flexDirection: 'row',
    justifyContent: 'space-around',
    '&:nth-of-type(2n)': {
      flexDirection: 'row-reverse',
    },
  }
});

const JobText = styled('div')({
  padding: '0 1rem'
})

const StyledPaper = styled('div')({
  backgroundColor: theme.palette.background.paper,
  margin: '0',
  padding: '2rem 0 1rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
});

const HeroText = styled('div')({
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.pages.index.heroBackground,
  padding: '2px',
  textAlign: 'center',
  borderRadius: '5px'
});

const HeroStyle = {
  width: '100%',
  height: '23rem'
};

const ImageDiv = styled('div')({
  width: '300px',
  flex: 'none',
  display: 'none',
  [theme.breakpoints.up(900)]: {
    display: 'block'
  },
});

const StyledList = styled(List)({
  margin: '0 auto',
  paddingTop: '0'
})

const ListIcon = styled(ListItemIcon)({
  minWidth: 'unset',
  paddingRight: '1rem'
});

const ListText = styled(ListItemText)({
  margin: '0',
});

const StyledLink = styled(Link)({
  '& h4:hover': {
    textDecoration: 'underline'
  }
})

const Title = styled(Typography)({
  fontWeight: 'bold'
})

const TitleUrl = styled(Typography)({
  color: theme.pages.index.titleURLColor,
  fontWeight: 'bold'
})

export default function Home({data}) {
  const heroImgData = getImage(data.hero);

  return (
    <Layout>
      <BackgroundImage image={heroImgData} style={HeroStyle}>
        <HeroText>
          <Typography variant="h3">{PageData.name}</Typography>
          <Typography variant="h4">{PageData.jobtitle}</Typography>
          <Typography variant="h4">{PageData.langs}</Typography>
        </HeroText>
      </BackgroundImage>
      <Suspense>
        <StyledPaper>
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
                  <JobText>
                    {!d.titleUrl ?
                      <Title variant="h4" align="center">{d.title}</Title> :
                      <StyledLink href={d.titleUrl} underline="none"
                        target="_blank" rel="noopener noreferrer"
                      >
                        <TitleUrl variant="h4" align="center">{d.title}</TitleUrl>
                      </StyledLink>
                    }
                    {d.p.map((text, count) => {
                      return (<Paragraph key={`${d.title} ${count}`}>{text}</Paragraph>)
                    })}
                  </JobText>
                  <ImageDiv>
                    <GatsbyImage image={data.jobs.nodes[imgID]['gatsbyImageData']} alt={d.imgAlt} />
                  </ImageDiv>
                </>
              );
            };
            return (
              <JobSection key={`paragraph-${i}`}>
                <InnerSection d={d} />
              </JobSection>
            )
          })}
          <StyledSection>
            <StaticImage
              src="../../static/img/map.png"
              alt="Map of Florida with Pin in Broward County"
              placeholder="none"
              width={300}
              height={300}
              style={{margin: '1rem 0 .5rem'}}
            />
            <Paragraph>{PageData.residence}</Paragraph>
            <Paragraph>
              I am open to opportunities in the following locations:
            </Paragraph>
            <StyledList dense>
              {PageData.openLocations.map((location) => {
                return (
                  <ListItem key={location}>
                    <ListIcon ><PlaceOutlined color="secondary"/></ListIcon>
                    <ListText primary={location}
                      primaryTypographyProps={{variant: 'body1'}}
                    />
                  </ListItem>
                );
              })}
            </StyledList>
          </StyledSection>
        </StyledPaper>
      </Suspense>
    </Layout>
  );
}

export const Head = ({data}) => {
  const image = getImage(data.hero);
  return (
    <SEO title={PageData.title} description={PageData.description}>
      <PreloadImage image={image} />
    </SEO>
  )
}

export const pageQuery = graphql`
  query IndexPage {
    hero: file(relativePath: {eq: "binary.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: NONE, quality: 30)
      }
    }
    jobs: allImageSharp(filter: {original: {src: {glob: "/static/index-*"}}}) {
      nodes {
        original {
          src
        }
        gatsbyImageData(width: 300, layout: CONSTRAINED, placeholder: NONE, quality: 70)
      }
    }
  }
`
