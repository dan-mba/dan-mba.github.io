import {GatsbyImage} from "gatsby-plugin-image";
import PreloadImage from "./PreloadImage";

export default function BackgroundImage({image, children, ...props}) {
  return (
    <section style={{display: 'grid'}} {...props}>
      <PreloadImage image={image} />
      <GatsbyImage image={image} loading="eager" alt="" style={{gridArea: '1/1'}}/>
      <div
        style={{
          gridArea: '1/1',
          position: 'relative',
          placeItems: 'center',
          display: 'grid',
        }}
      >
        {children}
      </div>
    </section>
  );
};
