import Image from "next/image";
import { useRef, useState } from "react";

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
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);

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
          <Button component="label" variant="contained" aria-label="add asset">
            <Input
              aria-hidden
              ref={inputRef}
              type="file"
              name="file"
              inputProps={{ accept: "image/jpg" }}
              sx={{
                clip: "rect(0 0 0 0)",
                clipPath: "inset(50%)",
                height: 1,
                overflow: "hidden",
                position: "absolute",
                bottom: 0,
                left: 0,
                whiteSpace: "nowrap",
                width: 1,
              }}
            />
            <AddPhotoAlternateIcon />
          </Button>
        </Tooltip>

        <Tooltip title={`Upload ${props.title}`}>
          <Box>
            <Button
              disabled={!file}
              type="submit"
              color="info"
              variant="contained"
              aria-label="upload asset"
              aria-disabled={!file}
            >
              <UploadFileIcon />
            </Button>
          </Box>
        </Tooltip>

        <Tooltip title={`Remove ${props.title}`}>
          <Box>
            <Button
              disabled={!props.image}
              variant="contained"
              color="error"
              aria-label="delete asset"
              aria-disabled={!props.image}
            >
              <DeleteIcon />
            </Button>
          </Box>
        </Tooltip>
      </ButtonGroup>
    </Stack>
  );
};

export default MediaAsset;
