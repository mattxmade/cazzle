import { useState } from "react";

import Card from "@mui/material/Card/Card";
import Stack from "@mui/material/Stack";
import { type TextFieldProps } from "@mui/material";

import MediaAsset from "./MediaAsset";
import FormCard from "@/components/forms/FormCard";
import FormSection from "@/components/forms/FormSection";
import MultilineTextField from "@/components/forms/inputs/MultilineTextField";
import useMediaAsset from "@/components/forms/hooks/useMediaAsset";

const textFieldProps: TextFieldProps = {
  required: false,
};

const cardSxProps = {
  paddingBottom: 1.5,
  flex: "auto",
  display: "flex",
  justifyContent: "center",
};

const ProfileForm = () => {
  const [pending, setPending] = useState(false);
  const [activeAsset, setActiveAsset] = useState<string | null>(null);

  // Profile media assets
  const logo = useMediaAsset({
    name: "logo",
    accepts: "image/jpg",
    setters: { setPending, setActiveAsset },
  });
  const advert = useMediaAsset({
    name: "advert",
    accepts: "image/jpg",
    setters: { setPending, setActiveAsset },
  });
  const banner = useMediaAsset({
    name: "banner",
    accepts: "image/jpg",
    setters: { setPending, setActiveAsset },
  });

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
            label="number"
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
        <FormSection
          heading="Media"
          stackProps={{ flexWrap: "wrap", justifyContent: "center" }}
        >
          <Card sx={cardSxProps}>
            <MediaAsset
              name={logo.name}
              asset={logo.blob}
              file={logo.file}
              lastFile={logo.lastFile}
              handlers={logo.handlers}
              inputAccepts={logo.accepts}
              isPending={pending}
              isUploading={activeAsset === logo.name}
            />
          </Card>

          <Card sx={cardSxProps}>
            <MediaAsset
              name={advert.name}
              asset={advert.blob}
              file={advert.file}
              lastFile={advert.lastFile}
              handlers={advert.handlers}
              inputAccepts={advert.accepts}
              isPending={pending}
              isUploading={activeAsset === advert.name}
            />
          </Card>

          <Card sx={cardSxProps}>
            <MediaAsset
              name={banner.name}
              asset={banner.blob}
              file={banner.file}
              lastFile={banner.lastFile}
              handlers={banner.handlers}
              inputAccepts={banner.accepts}
              isPending={pending}
              isUploading={activeAsset === banner.name}
            />
          </Card>
        </FormSection>
      </FormCard>
    </Stack>
  );
};

export default ProfileForm;
