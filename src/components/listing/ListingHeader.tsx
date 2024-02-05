import Stack from "@mui/material/Stack/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import LikeButton from "@/components/ui/buttons/LikeButton";
import ShareButton from "@/components/ui/buttons/ShareButton";

type ListingHeaderProps = {
  heading: string;
  children?: React.ReactNode;
};

const ListingHeader = ({ heading, children }: ListingHeaderProps) => {
  return (
    <Stack
      width={"100%"}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography variant="h1" fontSize={"1rem"} fontWeight={"500"}>
        {heading}
      </Typography>

      <Stack direction="row">
        <ShareButton />
        <Divider orientation="vertical" variant="middle" flexItem />
        <LikeButton />
      </Stack>
    </Stack>
  );
};

export default ListingHeader;
