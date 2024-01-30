type MediaGalleryProps = {
  mediaData: { src: string; alt: string; type: string }[];
};

const MediaGallery = ({ mediaData }: MediaGalleryProps) => {
  return <h1>Media Gallery</h1>;
};

export default MediaGallery;
