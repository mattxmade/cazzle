import Box from "@mui/material/Box";
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";

type ListingDetailProps = {
  Icon?: typeof SvgIcon;
  heading?: string;
  textContent?: string;
  override?: boolean;
  children?: React.ReactNode;
};

const ListingDetail = (props: ListingDetailProps) => {
  if (props.override && props.children) return props.children;

  const Icon = props.Icon || null;
  const heading = props.heading || "";
  const textContent = props.textContent || "";

  return (
    <>
      <Typography variant="body2">{heading}</Typography>

      <Box gap={1} display="flex" alignItems="center">
        {Icon ? <Icon fontSize="small" sx={{ color: "grey" }} /> : <></>}
        <Typography variant="body1" fontWeight="500">
          {textContent}
        </Typography>
      </Box>

      {props.children}
    </>
  );
};

export default ListingDetail;
