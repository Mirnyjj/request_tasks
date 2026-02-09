import type { FieldFormProps } from "@/lib/types";
import { Field, Textarea } from "@chakra-ui/react";

export const FieldTopic = ({ formData, handleChange }: FieldFormProps) => {
  return (
    <Field.Root mb="24px">
      <Field.Label
        fontWeight={400}
        color="#1C1C1C"
        fontSize="12px"
        htmlFor="topic"
      >
        Тема заявки
      </Field.Label>
      <Textarea
        id="topic"
        placeholder="Дайте заявке краткое название: например, сломался холодильник или не работает кондиционер"
        borderRadius={8}
        value={formData.topic}
        onChange={(e) => handleChange("topic", e.target.value)}
        rows={2}
      />
    </Field.Root>
  );
};
