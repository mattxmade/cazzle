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
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

import NoItemCard from "@/components/NoItemCard";

type MediaAssetProps = {
  title: string;
  Icon?: React.ReactNode;
  asset?: { src: string; alt: string };
  label?: string;
  inputAccepts: "image/jpg";
};

const MediaAsset = (props: MediaAssetProps) => {
  const [file, setFile] = useState(props.asset ?? null);
  const [upload, setUpload] = useState<File | null>(null);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.currentTarget as HTMLInputElement;
    const { files } = fileInput;

    if (!files?.length) return;

    const fileData = files[0];
    const blobUrl = URL.createObjectURL(files[0]);

    fileData && setUpload(fileData);
    blobUrl && setFile({ src: blobUrl, alt: fileData.name });
  };

  const handleRemoveFile = () => {
    if (!file) return;

    URL.revokeObjectURL(file.src);
    setFile(null);
  };

  useEffect(() => {
    return () => {
      if (file) URL.revokeObjectURL(file.src);
    };
  }, [file]);

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
        {file ? (
          <Image
            fill
            src={file.src}
            alt={file.alt}
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
              type="file"
              name="file"
              onChange={handleFileInputChange}
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
              disabled={!file}
              variant="contained"
              color="error"
              aria-label="delete asset"
              aria-disabled={!file}
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
