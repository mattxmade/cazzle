import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack/Stack";
import Input, { InputProps } from "@mui/material/Input";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup/ButtonGroup";

import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CircularProgress from "@mui/material/CircularProgress";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

import NoItemCard from "@/components/NoItemCard";

type MediaAssetProps = {
  name: string;
  isPending: boolean;
  isUploading: boolean;
  asset?: { src: string; alt: string };
  inputAccepts: "image/jpg";
  handleFile: (file: File, asset: string) => void;
};

const MediaAsset = (props: MediaAssetProps) => {
  const file = useRef<File | null>(null);
  const [blob, setBlob] = useState(props.asset ?? null);

  const handleChooseFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.currentTarget as HTMLInputElement;
    const { files } = fileInput;

    if (!files?.length) return;

    const fileData = files[0];
    const blobUrl = URL.createObjectURL(files[0]);

    file.current = fileData;
    blobUrl && setBlob({ src: blobUrl, alt: fileData.name });
  };

  const handleUploadFile = () => {
    if (!file.current) return;
    props.handleFile(file.current, props.name);
  };

  const handleRemoveFile = () => {
    if (!blob) return;

    URL.revokeObjectURL(blob.src);

    setBlob(null);
    file.current = null;
  };

  useEffect(() => {
    // Cleanup function
    return () => {
      blob && URL.revokeObjectURL(blob.src);
    };
  }, [blob]);

  return (
    <Stack width={210} alignItems="center" spacing={1}>
      <Typography variant="button">{props.name}</Typography>

      <Box
        width={110}
        height={110}
        position="relative"
        overflow="hidden"
        borderRadius={2}
      >
        {blob ? (
          <Image
            fill
            src={blob.src}
            alt={blob.alt}
            style={{ objectFit: "cover" }}
          />
        ) : (
          <NoItemCard variant="image" />
        )}
      </Box>

      <ButtonGroup>
        <Tooltip title={`Add ${props.name}`}>
          <Button
            component="label"
            variant="contained"
            aria-label="add asset"
            aria-disabled={props.isPending}
            disabled={props.isPending}
          >
            <Input
              aria-hidden
              type="file"
              name="file"
              onChange={handleChooseFile}
              inputProps={{ accept: props.inputAccepts }}
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

        <Tooltip title={`Upload ${props.name}`}>
          <Box>
            <Button
              disabled={!blob || props.isPending}
              type="submit"
              color="info"
              variant="contained"
              aria-label="upload asset"
              aria-disabled={!blob || props.isPending}
              onClick={handleUploadFile}
            >
              {!props.isUploading ? (
                <UploadFileIcon />
              ) : (
                <CircularProgress color="inherit" size={24} />
              )}
            </Button>
          </Box>
        </Tooltip>

        <Tooltip title={`Remove ${props.name}`}>
          <Box>
            <Button
              disabled={!blob || props.isPending}
              variant="contained"
              color="error"
              aria-label="delete asset"
              aria-disabled={!blob || props.isPending}
              onClick={handleRemoveFile}
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
