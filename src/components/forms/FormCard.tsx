import Card from "@mui/material/Card";

type FormCardProps = {
  children?: React.ReactNode;
};

const FormCard = (props: FormCardProps) => (
  <Card
    sx={{
      display: "grid",
      gap: 0.5,
      padding: 1,
      backgroundColor: "rgba(255, 255, 255, 0.5)",
    }}
  >
    {props.children}
  </Card>
);

export default FormCard;
