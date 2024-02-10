import Image from "next/image";
import NextLink from "next/link";
import Button from "@mui/material/Button";

type ImageBannerProps = {
  src: string;
  alt: string;
  slug?: string;
  height?: number;
  padding?: React.CSSProperties["padding"];
};

const ImageBanner = ({ src, alt, slug, height, padding }: ImageBannerProps) => {
  return (
    <Button
      fullWidth
      href={slug}
      component={NextLink}
      sx={{ height: height ?? 120, padding: padding ?? 0 }}
    >
      <Image fill src={src} alt={alt} style={{ objectFit: "cover" }} />
    </Button>
  );
};

export default ImageBanner;
