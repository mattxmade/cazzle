import { useRef, useState } from "react";

import Card from "@mui/material/Card/Card";
import Stack from "@mui/material/Stack";
import { type TextFieldProps } from "@mui/material";

import FormCard from "@/components/forms/FormCard";
import FormSection from "@/components/forms/FormSection";
import MultilineTextField from "@/components/forms/inputs/MultilineTextField";
import MediaAsset from "./MediaAsset";
import useMediaAsset from "@/components/forms/hooks/useMediaAsset";

import { type BranchDetails } from "@/types/runtime";
import { type FormDataFunction } from "../Dashboard";

const textFieldProps: TextFieldProps = {
  required: false,
};

const cardSxProps = {
  paddingBottom: 1.5,
  flex: "auto",
  display: "flex",
  justifyContent: "center",
};

type ProfileFormProps = {
  // branchDetails
  handleUpdateLocalData: FormDataFunction;
};

const ProfileForm = (props: ProfileFormProps) => {
  const [pending, setPending] = useState(false);
  const [activeAsset, setActiveAsset] = useState<string | null>(null);

  // Profile media assets
  const logo = useMediaAsset({
    docId: "", // TODO: add branch_id
    name: "logo",
    accepts: "image/jpg",
    setters: { setPending, setActiveAsset },
  });
  const advert = useMediaAsset({
    docId: "", // TODO: add branch_id
    name: "advert",
    accepts: "image/jpg",
    setters: { setPending, setActiveAsset },
  });
  const banner = useMediaAsset({
    docId: "", // TODO: add branch_id
    name: "banner",
    accepts: "image/jpg",
    setters: { setPending, setActiveAsset },
  });

  const formData = useRef<Partial<BranchDetails> | null>(null);

  const handleUpdateFormRef = (key: string, value: any) => {
    const { handleUpdateLocalData } = props;

    !formData.current
      ? (formData.current = { [key]: value })
      : (formData.current = { ...formData.current, [key]: value });

    formData.current && handleUpdateLocalData("agent", formData.current);
  };

  return (
    <Stack gap={2}>
      <FormCard>
        <FormSection heading="Details">
          <MultilineTextField
            id="branch-name"
            label="Branch name"
            validation="lettersWithHyphen"
            handleUpdateFormRef={handleUpdateFormRef}
          />

          <MultilineTextField
            id="telephone"
            label="Telephone"
            validation="number"
            handleUpdateFormRef={handleUpdateFormRef}
            textFieldProps={{ ...textFieldProps }}
          />

          <MultilineTextField
            id="email"
            label="Email"
            validation="lettersOnly"
            handleUpdateFormRef={handleUpdateFormRef}
            textFieldProps={{ ...textFieldProps }}
          />

          <MultilineTextField
            id="website"
            label="Website"
            validation="lettersOnly"
            handleUpdateFormRef={handleUpdateFormRef}
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
            handleUpdateFormRef={handleUpdateFormRef}
            textFieldProps={{ ...textFieldProps }}
          />
          <MultilineTextField
            id="street"
            label="Street"
            validation="lettersWithHyphen"
            handleUpdateFormRef={handleUpdateFormRef}
            textFieldProps={{ ...textFieldProps }}
          />
          <MultilineTextField
            id="town"
            label="Town/City"
            validation="lettersWithHyphen"
            handleUpdateFormRef={handleUpdateFormRef}
            textFieldProps={{ ...textFieldProps }}
          />
          <MultilineTextField
            id="postcode"
            label="Postcode"
            validation="postcode"
            handleUpdateFormRef={handleUpdateFormRef}
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
            handleUpdateFormRef={handleUpdateFormRef}
            textFieldProps={{ ...textFieldProps, fullWidth: true }}
          />

          <MultilineTextField
            id="description"
            label="Description"
            validation="multiline"
            handleUpdateFormRef={handleUpdateFormRef}
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
              isLoading={logo.isLoading}
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
              isLoading={advert.isLoading}
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
              isLoading={banner.isLoading}
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
