export default function PreloadImage({image}) {
  return (
    <link rel="preload" as="image"
      imageSrcSet={image.images.sources[0].srcSet}
      imageSizes={image.images.sources[0].sizes}
    />
  )
}