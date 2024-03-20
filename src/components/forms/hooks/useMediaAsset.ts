import { useCallback, useState } from "react";

type UseMediaAssetParams = {
  name: string;
  asset?: { src: string; alt: string };
  accepts: "image/jpg";
};

const useMediaAsset = (params: UseMediaAssetParams) => {
  const [blob, setBlob] = useState(params.asset ?? null);
  const [file, setFile] = useState<File | null>(null);
  const [lastFile, setLastFile] = useState<File | null>(null);
};

export default useMediaAsset;
