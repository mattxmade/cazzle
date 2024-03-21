import { useCallback, useEffect, useState } from "react";

type UseMediaAssetParams = {
  name: string;
  asset?: { src: string; alt: string };
  accepts: "image/jpg";
};

const useMediaAsset = (params: UseMediaAssetParams) => {
  const [blob, setBlob] = useState(params.asset ?? null);
  const [file, setFile] = useState<File | null>(null);
  const [lastFile, setLastFile] = useState<File | null>(null);

  const handleChooseFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.currentTarget as HTMLInputElement;
    const { files } = fileInput;

    if (!files || !files.length) return;

    const fileData = files[0];
    const blobUrl = URL.createObjectURL(files[0]);

    fileData && setFile(fileData);
    blobUrl && setBlob({ src: blobUrl, alt: params.name });

    const input = e.currentTarget as HTMLInputElement;
    input.value = "";
  };

  const handleUploadFile = () => {
    if (!file) return;
    setLastFile(file);
  };

  const handleRevokeObjectUrl = () => {
    blob && URL.revokeObjectURL(blob.src);
  };

  const handleRemoveFile = () => {
    handleRevokeObjectUrl();
    setBlob(null);
  };

  useEffect(() => {
    return () => handleRevokeObjectUrl();
  }, [blob]);

  return {
    blob,
    name: params.name,
    accepts: params.accepts,
    handlers: {
      chooseFile: handleChooseFile,
      uploadFile: handleUploadFile,
      removeFile: handleRemoveFile,
    },
  };
};

export default useMediaAsset;
