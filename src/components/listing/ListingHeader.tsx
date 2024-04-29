import Stack from "@mui/material/Stack/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import ShareButton from "@/components/ui/buttons/ShareButton";
import FavouritesForm from "../user/favourites/FavesForm";

import getSignedInUser from "@/server/user/getUser";
import { Id } from "@/../convex/_generated/dataModel";

type ListingHeaderProps = {
  heading: string;
  listingId: Id<"properties">;
  children?: React.ReactNode;
};

const ListingHeader = async (props: ListingHeaderProps) => {
  const user = await getSignedInUser();
  const userFavourites = !user ? [] : user.current?.favourites ?? [];

  return (
    <Stack
      width={"100%"}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography variant="h1" fontSize={"1rem"} fontWeight={"500"}>
        {props.heading}
      </Typography>

      <Stack direction="row" gap={0.5}>
        <ShareButton elevation={0} borderRadius={1} />
        <Divider orientation="vertical" variant="middle" flexItem />
        <FavouritesForm
          listingId={props.listingId}
          isUserFavourite={userFavourites.includes(props.listingId)}
          skipText={true}
          elevation={0}
          borderRadius={1}
        />
      </Stack>
    </Stack>
  );
};

export default ListingHeader;
