import Stack from "@mui/material/Stack";
import { type TextFieldProps } from "@mui/material";

import FormCard from "@/components/forms/FormCard";
import FormSection from "@/components/forms/FormSection";
import MultilineTextField from "@/components/forms/inputs/MultilineTextField";

const textFieldProps: TextFieldProps = {
  required: false,
};

const ProfileForm = () => {
  return (
    <Stack gap={2}>
      <FormCard>
        <FormSection heading="Details">
          <MultilineTextField
            id="branch-name"
            label="Branch name"
            validation="lettersWithHyphen"
            handleUpdateFormRef={() => {}}
          />

          <MultilineTextField
            id="telephone"
            label="Telephone"
            validation="number"
            handleUpdateFormRef={() => {}}
            textFieldProps={{ ...textFieldProps }}
          />

          <MultilineTextField
            id="email"
            label="Email"
            validation="lettersOnly"
            handleUpdateFormRef={() => {}}
            textFieldProps={{ ...textFieldProps }}
          />

          <MultilineTextField
            id="website"
            label="Website"
            validation="lettersOnly"
            handleUpdateFormRef={() => {}}
            textFieldProps={{ ...textFieldProps }}
          />
        </FormSection>
      </FormCard>

      <FormCard>
        <FormSection heading="Address">
          <MultilineTextField
            id="street-number"
            label="Street number"
            validation="number"
            handleUpdateFormRef={() => {}}
            textFieldProps={{ ...textFieldProps }}
          />
          <MultilineTextField
            id="street"
            label="Street"
            validation="lettersWithHyphen"
            handleUpdateFormRef={() => {}}
            textFieldProps={{ ...textFieldProps }}
          />
          <MultilineTextField
            id="town"
            label="Town/City"
            validation="lettersWithHyphen"
            handleUpdateFormRef={() => {}}
            textFieldProps={{ ...textFieldProps }}
          />
          <MultilineTextField
            id="postcode"
            label="Postcode"
            validation="postcode"
            handleUpdateFormRef={() => {}}
            textFieldProps={{ ...textFieldProps }}
          />
        </FormSection>
      </FormCard>

      <FormCard>
        <FormSection heading="About" stackProps={{ direction: "column" }}>
          <MultilineTextField
            id="summary"
            label="Summary"
            validation="singleline"
            handleUpdateFormRef={() => {}}
            textFieldProps={{ ...textFieldProps, fullWidth: true }}
          />

          <MultilineTextField
            id="description"
            label="Description"
            validation="multiline"
            handleUpdateFormRef={() => {}}
            textFieldProps={{ ...textFieldProps, fullWidth: true }}
          />
        </FormSection>
      </FormCard>

      <FormCard>
        <FormSection heading="Media">
          <MultilineTextField
            id="banner"
            label="Banner"
            validation="multiline"
            handleUpdateFormRef={() => {}}
            textFieldProps={{ ...textFieldProps }}
          />

          <MultilineTextField
            id="logo"
            label="Logo"
            validation="singleline"
            handleUpdateFormRef={() => {}}
            textFieldProps={{ ...textFieldProps }}
          />

          <MultilineTextField
            id="banner"
            label="Banner"
            validation="singleline"
            handleUpdateFormRef={() => {}}
            textFieldProps={{ ...textFieldProps }}
          />
        </FormSection>
      </FormCard>
    </Stack>
  );
};

export default ProfileForm;
