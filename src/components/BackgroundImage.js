import {styled} from '@mui/material/styles';
import {GatsbyImage} from "gatsby-plugin-image";
import PreloadImage from './PreloadImage';

const HeroBox = styled('div')({
  gridArea: '1/1',
  position: 'relative',
  placeItems: 'center',
  display: 'grid',
})

const BkgImage = styled(GatsbyImage)({
  gridArea: '1/1',
})

export default function BackgroundImage({image, children, style}) {
  return (
    <section style={{display: 'grid', ...style}}>
      <PreloadImage image={image} />
      <BkgImage image={image} loading="eager" alt=""/>
      <HeroBox>
        {children}
      </HeroBox>
    </section>
  );
};
