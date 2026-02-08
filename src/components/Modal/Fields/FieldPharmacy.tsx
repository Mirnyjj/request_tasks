import { pharmacies } from "@/lib/mockData";
import type { FieldFormProps } from "@/lib/types";

import {
  Badge,
  Button,
  Field,
  Flex,
  Select,
  Text,
  createListCollection,
} from "@chakra-ui/react";
import { HiOutlineChevronDown } from "react-icons/hi";

export const FieldPharmacy = ({
  setFormData,
  handleChange,
  formData,
}: FieldFormProps) => {
  const selectedPharmacy = pharmacies.find((p) => p.id === formData.pharmacyId);
  const pharmacyCollection = createListCollection({
    items: [
      { value: "", label: "Выберите аптеку от которой исходит заявка" },
      ...pharmacies.map((p) => ({
        value: p.id,
        label: `${p.id} - ${p.name}`,
      })),
    ],
  });
  return (
    <Field.Root pb={{ base: "24px", md: "48px" }}>
      <Field.Label
        fontWeight={400}
        color="#1C1C1C"
        fontSize="12px"
        htmlFor="pharmacyId"
      >
        Аптека
      </Field.Label>

      {selectedPharmacy ? (
        <Flex
          align="center"
          borderWidth="1px"
          borderColor="gray.300"
          px="3"
          w="100%"
          justifyContent="space-between"
          alignItems="center"
          borderRadius={8}
          h="5vh"
          // h="48px"
        >
          <Badge mr="2" fontWeight={500}>
            {selectedPharmacy.id}
          </Badge>
          {(() => {
            const [first, ...rest] = selectedPharmacy.name.split(" ");
            return (
              <Flex flex="1" justifyContent="flex-start" alignItems="center">
                <Text fontSize="sm">
                  <Text as="span" fontWeight={500}>
                    {first}
                  </Text>
                  <Text as="span">{rest.join(" ")}</Text>
                </Text>
              </Flex>
            );
          })()}

          {setFormData && (
            <Button
              variant="outline"
              py="6px"
              px="4px"
              size="xs"
              borderRadius={8}
              letterSpacing={0}
              fontSize="12px"
              h="auto"
              onClick={() =>
                setFormData({
                  ...formData,
                  pharmacyId: "",
                })
              }
            >
              Изменить
            </Button>
          )}
        </Flex>
      ) : (
        <Select.Root
          collection={pharmacyCollection}
          value={formData.pharmacyId ? [formData.pharmacyId] : []}
          onValueChange={(details) =>
            handleChange("pharmacyId", details.value[0])
          }
        >
          <Select.Trigger
            id="pharmacyId"
            h="5vh"
            borderRadius={8}
            children={
              <Flex w="100%" justifyContent="space-between" alignItems="center">
                <Text color="#B0B0B0">
                  Выберите аптеку от которой исходит заявка
                </Text>
                <HiOutlineChevronDown size={24} />
              </Flex>
            }
          />

          <Select.Content position="absolute" w="100%">
            {pharmacies.map((p) => (
              <Select.Item key={p.id} item={p.id}>
                {p.id} — {p.name}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      )}
    </Field.Root>
  );
};
