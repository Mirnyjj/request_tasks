import type { FieldFormProps } from "@/lib/types";
import { Field, Textarea } from "@chakra-ui/react";

export const FieldDescription = ({
  formData,
  handleChange,
}: FieldFormProps) => {
  return (
    <Field.Root mb="24px">
      <Field.Label fontWeight={400} color="#1C1C1C" fontSize="12px">
        Описание проблемы
      </Field.Label>
      <Textarea
        _placeholder={{
          paddingLeft: 0,
          marginLeft: 0,
          textAlign: "left",
          whiteSpace: "pre-line",
          lineHeight: 1.4,
        }}
        placeholder="Кратко опишите проблему:

・ что случилось?
・ дата и время произошедшего?
・ сколько длится проблема?
・ насколько она влияет на вашу работу?"
        borderRadius={8}
        value={formData.description}
        onChange={(e) => handleChange("description", e.target.value)}
        rows={8}
      />
    </Field.Root>
  );
};
