import { categories } from "@/lib/mockData";
import type { FieldFormProps } from "@/lib/types";
import {
  Field,
  Flex,
  Select,
  Text,
  createListCollection,
} from "@chakra-ui/react";
import { HiOutlineChevronDown } from "react-icons/hi";

export const FieldCategory = ({ handleChange, formData }: FieldFormProps) => {
  const categoryCollection = createListCollection({
    items: [
      { value: "", label: "Холодильники, кондиционеры или другое" },
      ...categories.map((cat) => ({
        value: cat,
        label: cat,
      })),
    ],
  });
  return (
    <Field.Root pb="16px">
      <Field.Label
        fontWeight={400}
        color="#1C1C1C"
        fontSize="12px"
        htmlFor="category"
      >
        Категория заявки
      </Field.Label>

      <Select.Root
        collection={categoryCollection}
        value={formData.category ? [formData.category] : []}
        onValueChange={(details) => handleChange("category", details.value[0])}
      >
        <Select.Trigger
          id="category"
          h="5vh"
          borderRadius={8}
          children={
            <Flex w="100%" justifyContent="space-between" alignItems="center">
              <Text color={!formData.category ? "#B0B0B0" : "black"}>
                {formData.category
                  ? formData.category
                  : "Холодильники, кондиционеры или другое"}
              </Text>
              <HiOutlineChevronDown size={24} />
            </Flex>
          }
        />
        <Select.Content position="absolute" w="100%">
          {categories.map((cat) => (
            <Select.Item key={cat} item={cat}>
              {cat}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </Field.Root>
  );
};
