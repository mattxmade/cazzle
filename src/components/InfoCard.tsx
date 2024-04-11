import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";

import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import deepPurple from "@mui/material/colors/deepPurple";

type InfoCardProps = {
  name: string;
  title: string;
  heading: string;
  subheading: string;
};

const InfoCard = (props: InfoCardProps) => (
  <Card sx={{ width: 470 }} elevation={6}>
    <CardActionArea sx={{ padding: "24px" }}>
      <CardHeader
        sx={{
          gap: "6px",
          display: "grid",
          placeItems: "center",
        }}
        title={
          <Typography variant="h6" color="text.secondary">
            {props.title}
          </Typography>
        }
        avatar={
          <Avatar sx={{ bgcolor: deepPurple[500] }} aria-label={props.name}>
            {props.name.slice(0, 1).toUpperCase()}
          </Avatar>
        }
      />
      <CardContent sx={{ display: "grid", placeItems: "center" }}>
        <Typography variant="h4" color="text.secondary">
          {props.heading}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {props.subheading}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);

export default InfoCard;
