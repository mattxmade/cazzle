import Image from "next/image";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack/Stack";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup/ButtonGroup";

import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

import NoItemCard from "@/components/NoItemCard";

type MediaAssetProps = {
  title: string;
  Icon?: React.ReactNode;
  image?: { src: string; alt: string };
  label?: string;
};

const MediaAsset = (props: MediaAssetProps) => {
  return (
    <Stack width={210} alignItems="center" spacing={1}>
      <Typography variant="button">{props.title}</Typography>

      <Box
        width={110}
        height={110}
        position="relative"
        overflow="hidden"
        borderRadius={1}
      >
        {props.image ? (
          <Image
            fill
            src={props.image.src}
            alt={props.image.alt}
            style={{ objectFit: "cover" }}
          />
        ) : (
          <NoItemCard variant="image" />
        )}
      </Box>

      <ButtonGroup>
        <Tooltip title={`Add ${props.title}`}>
          <Button variant="contained" aria-label="add asset">
            <Input
              aria-hidden
              type="file"
              name="file"
              inputProps={{ accept: "image/jpg" }}
              sx={{ display: "none" }}
            />
            <AddPhotoAlternateIcon />
          </Button>
        </Tooltip>

        <Tooltip title={`Upload ${props.title}`}>
          <Button
            type="submit"
            color="info"
            variant="contained"
            aria-label="upload asset"
          >
            <UploadFileIcon />
          </Button>
        </Tooltip>

        <Tooltip title={`Remove ${props.title}`}>
          <Button variant="contained" color="error" aria-label="delete asset">
            <DeleteIcon />
          </Button>
        </Tooltip>
      </ButtonGroup>
    </Stack>
  );
};

export default MediaAsset;
