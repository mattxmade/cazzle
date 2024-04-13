"use client";

import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import ButtonGroup from "@mui/material/ButtonGroup";
import FormControl from "@mui/material/FormControl";

import { content } from "@/app/content";

type BranchAccountStepProps = {
  branchNameValue: string;
  children?: React.ReactNode;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const BranchAccountStep = (props: BranchAccountStepProps) => {
  return (
    <Stack component="section" spacing={3}>
      <Card
        elevation={4}
        sx={{
          padding: 4,
          marginLeft: 2,
          backdropFilter: "blur(2px)",
          backgroundColor: "hsl(0 0% 100%/.6)",
        }}
      >
        <Stack component="form" spacing={2}>
          <Typography variant="h2" fontWeight={500} fontSize={24}>
            {content.forms.account.branch.title}
          </Typography>

          <Typography variant="body1" width={"min(100%, 60ch)"}>
            {content.forms.account.branch.description}
          </Typography>

          <FormControl sx={{ maxWidth: "min(100%, 20rem)" }}>
            <TextField
              required
              label="Branch name"
              variant="standard"
              value={props.branchNameValue}
              onChange={props.handleInputChange}
            />
          </FormControl>
        </Stack>
      </Card>

      <Typography variant="subtitle2" sx={{ paddingLeft: 1 }}>
        {content.forms.account.branch.note}
      </Typography>

      <ButtonGroup>{props.children}</ButtonGroup>
    </Stack>
  );
};

export default BranchAccountStep;
