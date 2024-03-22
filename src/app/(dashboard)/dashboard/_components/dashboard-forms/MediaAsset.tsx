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
import CircularProgress from "@mui/material/CircularProgress";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

import NoItemCard from "@/components/NoItemCard";

type MediaAssetProps = {
  name: string;
  file: File | null;
  lastFile: File | null;
  isPending: boolean;
  isUploading: boolean;
  asset: { src: string; alt: string } | null;
  inputAccepts: "image/jpg";
  handlers: {
    chooseFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
    uploadFile: () => void;
    removeFile: () => void;
  };
};

const MediaAsset = (props: MediaAssetProps) => {
  const { asset, file, lastFile, handlers } = props;

  const isChooseButtonDisabled = props.isPending;
  const isRemoveButtonDisabled = !asset || props.isPending;
  let isUploadButtonDisabled = !asset || props.isPending;

  if (file && lastFile) {
    if (file.name === lastFile.name && file.size === lastFile.size)
      isUploadButtonDisabled = true;
  }

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
        {asset ? (
          <Image
            fill
            src={asset.src}
            alt={asset.alt}
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
            aria-disabled={isChooseButtonDisabled}
            disabled={isChooseButtonDisabled}
          >
            <Input
              type="file"
              name="file"
              aria-hidden={true}
              onChange={handlers.chooseFile}
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
              type="submit"
              color="info"
              variant="contained"
              aria-label="upload asset"
              aria-disabled={isUploadButtonDisabled}
              disabled={isUploadButtonDisabled}
              onClick={handlers.uploadFile}
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
              variant="contained"
              color="error"
              aria-label="delete asset"
              aria-disabled={isRemoveButtonDisabled}
              disabled={isRemoveButtonDisabled}
              onClick={handlers.removeFile}
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
