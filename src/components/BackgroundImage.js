import React from "react";
import {styled} from '@mui/material/styles';
import {GatsbyImage} from "gatsby-plugin-image";

const HeroBox = styled('div')({
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
})

const BkgImage = styled(GatsbyImage)({
  height: '100%',
  width: '100%',
  overflow: 'hidden',
})

export default function BackgroundImage({image, children, style}) {
  return (
    <section style={{position: 'relative', ...style}}>
      <BkgImage image={image} loading="eager" alt=""/>
      <HeroBox>
        {children}
      </HeroBox>
    </section>
  );
};
