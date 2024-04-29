import Card, { CardProps } from "@mui/material/Card/Card";
import Button from "@mui/material/Button";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";

type ShareButtonProps = {
  elevation?: CardProps["elevation"];
  color?: React.CSSProperties["color"];
  borderRadius?: React.CSSProperties["borderRadius"];
};

const ShareButton = (props: ShareButtonProps) => (
  <Button
    type="button"
    name="share-listing-btn"
    aria-label="share listing"
    sx={{
      minWidth: 0,
      minHeight: 0,
      padding: 0.75,
      borderRadius: props.borderRadius ?? "100%",
    }}
  >
    <Card
      elevation={props.elevation}
      sx={{
        lineHeight: 0,
        padding: 1,
        borderRadius: props.borderRadius ?? "100%",
        color: props.color ?? "inherit",
      }}
    >
      <ShareOutlinedIcon />
    </Card>
  </Button>
);

export default ShareButton;
