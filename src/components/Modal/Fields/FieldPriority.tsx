import type { FieldFormProps, Priority } from "@/lib/types";
import {
  Field,
  Flex,
  Select,
  Text,
  createListCollection,
} from "@chakra-ui/react";
import {
  HiOutlineChevronDoubleUp,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
} from "react-icons/hi";
import { PiDiamond } from "react-icons/pi";

const priorityOptions = [
  {
    value: "critical",
    label: "Критический:",
    desc: "простой в работе, риск потери товара",
    color: "rgba(185, 60, 60, 1)",
    icon: <HiOutlineChevronDoubleUp size="14px" color="rgba(185, 60, 60, 1)" />,
  },
  {
    value: "high",
    label: "Высокий:",
    desc: "требует срочного решения",
    color: "rgba(185, 60, 60, 1)",
    icon: <HiOutlineChevronUp size="14px" color="rgba(185, 60, 60, 1)" />,
  },
  {
    value: "medium",
    label: "Средний:",
    desc: "влияет на эффективность, но не стопорит",
    color: "rgba(204, 137, 42, 1)",
    icon: <PiDiamond size="14px" color="rgba(204, 137, 42, 1)" />,
  },
  {
    value: "low",
    label: "Низкий:",
    desc: "можно отложить",
    color: "rgba(45, 96, 237, 1)",
    icon: <HiOutlineChevronDown size="14px" color="rgba(45, 96, 237, 1)" />,
  },
];

export const FieldPriority = ({ formData, handleChange }: FieldFormProps) => {
  const selectedPriority = priorityOptions.find(
    (p) => p.value === formData.priority
  );

  const priorityCollection = createListCollection({
    items: priorityOptions.map((p) => ({
      value: p.value,
      label: `${p.label} ${p.desc}`,
    })),
  });

  return (
    <Field.Root mb="24px">
      <Field.Label fontWeight={400} color="#1C1C1C" fontSize="12px">
        Приоритет
      </Field.Label>

      <Select.Root
        collection={priorityCollection}
        value={formData.priority ? [formData.priority] : []}
        onValueChange={(details) =>
          handleChange("priority", details.value[0] as Priority)
        }
      >
        <Select.Trigger
          h="5vh"
          borderRadius={8}
          children={
            <Flex w="100%" justifyContent="space-between" alignItems="center">
              <Flex
                flexWrap="nowrap"
                alignItems="center"
                gap={2}
                fontSize="12px"
              >
                {selectedPriority?.icon}
                <Flex flexDirection={{ base: "column", md: "row" }} gap={1}>
                  <Text fontWeight={500}>{selectedPriority?.label}</Text>
                  <Text color="#B0B0B0">{selectedPriority?.desc}</Text>
                </Flex>
              </Flex>
              <HiOutlineChevronDown size={24} />
            </Flex>
          }
        />
        <Select.Content position="absolute" w="100%">
          {priorityOptions.map((p) => (
            <Select.Item
              key={p.value}
              item={p.value}
              display="flex"
              w="100%"
              flexWrap="nowrap"
              justifyContent="start"
              alignItems="center"
            >
              {p.icon}

              <Text>{p.label}</Text>
              <Text color="#B0B0B0">{p.desc}</Text>
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </Field.Root>
  );
};
