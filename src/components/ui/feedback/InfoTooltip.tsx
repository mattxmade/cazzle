import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Link from "@mui/material/Link";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import Typography from "@mui/material/Typography";

type InfoTooltipProps = {
  heading: string;
  subheading?: string;
  body?: string;
  link?: { href: string; text: string };
  children?: React.ReactNode;
};

const InfoTooltip = (props: InfoTooltipProps) => {
  return (
    <Box
      sx={{
        padding: 0,
        minWidth: 0,
        position: "relative",
        borderRadius: "100%",
      }}
    >
      <Tooltip
        placement="top"
        sx={{ backgroundColor: "#24244a !important" }}
        slotProps={{
          tooltip: {
            sx: {
              padding: "1rem",
              backgroundColor: "#24244a",
            },
          },
          arrow: {
            sx: {
              "::before": {
                backgroundColor: "#24244a",
              },
            },
          },
          popper: {
            modifiers: [
              {
                name: "offset",
                options: { offset: [0, 5] },
              },
            ],
          },
        }}
        title={
          <Typography sx={{ display: "grid", gap: 1 }}>
            <Typography variant="h6">
              <em>{props.heading}</em>
            </Typography>
            {props.subheading ?? null}
            {props.body ? <p>{props.body} </p> : null}
            {props.link ? (
              <Link href={props.link.href} variant="body2" fontWeight="500">
                {props.link.text}
              </Link>
            ) : null}
          </Typography>
        }
        arrow
      >
        <Button
          sx={{
            minWidth: 0,
            padding: 0,
            inset: 0,
            marginLeft: 1,
            position: "absolute",
            borderRadius: "100%",
          }}
        >
          <InfoIcon fontSize="small" sx={{ color: "grey" }} />
        </Button>
      </Tooltip>
    </Box>
  );
};

export default InfoTooltip;
