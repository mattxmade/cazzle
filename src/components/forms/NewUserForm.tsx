import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

type NewUserFormProps = {
  heading: string;
};

const NewUserForm = ({ heading }: NewUserFormProps) => {
  return (
    <Container component="form" maxWidth="xl">
      <Typography variant="h1" sx={{ fontSize: 48 }}>
        {heading}
      </Typography>

      <FormControl>
        <FormLabel id="new-user-signup">Account type</FormLabel>
        <RadioGroup
          row
          aria-labelledby="new-user-signup"
          name="row-radio-buttons-group"
        >
          <FormControlLabel
            value="standard"
            control={<Radio />}
            label="Standard"
          />
          <FormControlLabel
            value="estate-agent"
            control={<Radio />}
            label="Estate-agent"
          />
        </RadioGroup>
      </FormControl>
    </Container>
  );
};

export default NewUserForm;
