import { useEffect, useState, useTransition } from "react";
import { DbResponse } from "@/data/dbStatus";

type UseMediaAssetParams = {
  name: string;
  accepts: "image/jpg";
  setters: {
    setPending: React.Dispatch<React.SetStateAction<boolean>>;
    setActiveAsset: React.Dispatch<React.SetStateAction<string | null>>;
  };
  id?: string;
  docId: string;
  asset?: { src: string; alt: string };
  uploadAsset?: (FormData: FormData) => Promise<DbResponse>;
  getAssetUrl?: (formData: FormData) => Promise<string | null | undefined>;
};

const useMediaAsset = (params: UseMediaAssetParams) => {
  const [pending, startTransition] = useTransition();

  const [init, setInit] = useState(true);
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
    if (!file || !params.uploadAsset) return;

    if (file && lastFile) {
      if (file.name === lastFile.name && file.size === lastFile.size) return;
    }

    const { setPending, setActiveAsset } = params.setters;

    setPending(true);
    setActiveAsset(params.name);

    const formData = new FormData();

    formData.append("id", params.docId);
    formData.append("file", file);

    startTransition(async () => {
      if (!params.uploadAsset) return;

      const response = await params.uploadAsset(formData);
      if (response.status === "error") return setPending(false);

      setPending(false);
      setActiveAsset(null);

      setLastFile(file);
    });
  };

  const handleRevokeObjectUrl = () => {
    blob && URL.revokeObjectURL(blob.src);
  };

  const handleRemoveFile = () => {
    handleRevokeObjectUrl();
    setBlob(null);
  };

  useEffect(() => {
    if (!init || !params.id || !params.getAssetUrl || pending) return;

    const formData = new FormData();
    formData.append("asset", params.id);

    startTransition(async () => {
      const url = params.getAssetUrl && (await params.getAssetUrl(formData));
      if (typeof url !== "string" || !url.length) return;

      setInit(false);
      setBlob({ src: url, alt: params.name });
    });
  }, []);

  useEffect(() => {
    return () => handleRevokeObjectUrl();
  }, [blob]);

  return {
    blob,
    file,
    lastFile,
    name: params.name,
    isLoading: pending,
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
