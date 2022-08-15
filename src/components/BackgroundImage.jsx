import {styled} from '@mui/material/styles';
import {GatsbyImage} from "gatsby-plugin-image";

const HeroBox = styled('div')({
  gridArea: '1/1',
  position: 'relative',
  placeItems: 'center',
  display: 'grid',
})

export default function BackgroundImage({image, children, style}) {
  return (
    <section style={{display: 'grid', ...style}}>
      <GatsbyImage image={image} loading="eager" alt="" style={{gridArea: '1/1'}}/>
      <HeroBox>
        {children}
      </HeroBox>
    </section>
  );
};
