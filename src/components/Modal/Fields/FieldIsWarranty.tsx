import type { FieldFormProps } from "@/lib/types";
import { Checkbox } from "@chakra-ui/react";

export const FieldIsWarranty = ({ formData, handleChange }: FieldFormProps) => {
  return (
    <Checkbox.Root
      mb={{ base: 0, md: "16px" }}
      checked={formData.isWarranty}
      onCheckedChange={(e) => handleChange("isWarranty", !!e.checked)}
    >
      <Checkbox.HiddenInput />
      <Checkbox.Control borderRadius={5} />
      <Checkbox.Label fontWeight={400}>Гарантийный случай?</Checkbox.Label>
    </Checkbox.Root>
  );
};
