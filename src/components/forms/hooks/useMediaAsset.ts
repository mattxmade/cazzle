import { useCallback, useEffect, useState } from "react";

type UseMediaAssetParams = {
  name: string;
  accepts: "image/jpg";
  setters: {
    setPending: React.Dispatch<React.SetStateAction<boolean>>;
    setActiveAsset: React.Dispatch<React.SetStateAction<string | null>>;
  };
  asset?: { src: string; alt: string };
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
    input.value = ""; // [1]
  };

  const handleUploadFile = () => {
    if (!file) return;

    if (file && lastFile) {
      if (file.name === lastFile.name && file.size === lastFile.size) return;
    }

    const { setPending, setActiveAsset } = params.setters;

    setPending(true);
    setActiveAsset(params.name);

    const timeout = setTimeout(() => {
      clearTimeout(timeout);

      setPending(false);
      setActiveAsset(null);

      setLastFile(file);
    }, 5000);
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
    file,
    lastFile,
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

// [ 1 ] : Allow user to select same file
// INFO  : https://github.com/ngokevin/react-file-reader-input/issues/11#issuecomment-363484861
