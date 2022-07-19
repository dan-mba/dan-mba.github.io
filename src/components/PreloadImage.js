export default function PreloadImage({image}) {
  return (
    <link rel="preload" as="image"
      imagesrcset={image.images.sources[0].srcSet}
      imagesizes={image.images.sources[0].sizes}
    />
  )
}