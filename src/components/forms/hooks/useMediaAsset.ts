type UseMediaAssetParams = {
  name: string;
  asset?: { src: string; alt: string };
  accepts: "image/jpg";
};

const useMediaAsset = (params: UseMediaAssetParams) => {};

export default useMediaAsset;
