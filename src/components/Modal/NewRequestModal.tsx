import React, { useState, useRef } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Textarea,
  Badge,
  createListCollection,
  Dialog,
  Portal,
  Field,
  Select,
  Checkbox,
  Input,
  Grid,
  List,
} from "@chakra-ui/react";

import type {
  FormErrors,
  NewRequestFormData,
  NewRequestModalProps,
  Priority,
} from "../../lib/types";
import { categories, pharmacies } from "../../lib/mockData";

import {
  HiOutlineChevronDoubleUp,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
} from "react-icons/hi";
import { PiDiamond } from "react-icons/pi";
import { UploadFile } from "./UploadFile";
import { RiCloseLargeFill } from "react-icons/ri";
import { IoMdWarning } from "react-icons/io";
import { validateForm } from "@/utils/validateForm";
import { FormErrorSummary } from "./FormErrorSummary";

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

const helpNeeded = [
  "температура в камере выше допустимой нормы (+2...+8 °C) и не восстанавливается",
  "оборудование издаёт необычные шумы (гул, стук, вибрация)",
  "есть ошибка на дисплее или аварийный сигнал",
  "дверь не закрывается/сломаны уплотнители",
  "холодильник не включается или выключается самопроизвольно",
];

const helpNotNeeded = [
  "просто загружено много товара, и температура временно повысилась",
  "дверь была оставлена открытой, и холодильник «догоняет» температуру",
  "требуется только разморозка (согласно регламенту её выполняет персонал аптеки)",
];

export function NewRequestModal({ isOpen, onClose }: NewRequestModalProps) {
  const [formData, setFormData] = useState<NewRequestFormData>({
    pharmacyId: "",
    priority: "medium",
    topic: "",
    category: "",
    description: "",
    isWarranty: false,
    files: [],
  });
  const [filePreview, setFilePreview] = useState<
    { name: string; url: string; type: string }[]
  >([]);
  const [submitStep, setSubmitStep] = useState<"form" | "confirm">("form");
  const [errors, setErrors] = useState<FormErrors>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const selectedPharmacy = pharmacies.find((p) => p.id === formData.pharmacyId);
  const selectedPriority = priorityOptions.find(
    (p) => p.value === formData.priority
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (submitStep === "form") {
      const validationErrors = validateForm(formData);
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length > 0) {
        return;
      }

      setSubmitStep("confirm");

      return;
    }

    if (submitStep === "confirm") {
      console.log("formData", formData);
      setSuccessMessage("Ваша заявка успешно отправлена!");

      resetForm();
      setSubmitStep("form");

      setTimeout(() => {
        setSuccessMessage("");
        onClose();
      }, 2000);
    }
  };

  const handleChange = <K extends keyof NewRequestFormData>(
    field: K,
    value: NewRequestFormData[K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));
  };

  const pharmacyCollection = createListCollection({
    items: [
      { value: "", label: "Выберите аптеку от которой исходит заявка" },
      ...pharmacies.map((p) => ({
        value: p.id,
        label: `${p.id} - ${p.name}`,
      })),
    ],
  });

  const categoryCollection = createListCollection({
    items: [
      { value: "", label: "Холодильники, кондиционеры или другое" },
      ...categories.map((cat) => ({
        value: cat,
        label: cat,
      })),
    ],
  });

  const priorityCollection = createListCollection({
    items: priorityOptions.map((p) => ({
      value: p.value,
      label: `${p.label} ${p.desc}`,
    })),
  });

  const resetForm = () => {
    setFormData({
      pharmacyId: "",
      priority: "medium",
      topic: "",
      category: "",
      description: "",
      isWarranty: false,
      files: [],
    });
    setFilePreview([]);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setFormData((prev) => ({ ...prev, files: [...prev.files, ...newFiles] }));

      newFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview((prev) => [
            ...prev,
            {
              name: file.name,
              url: reader.result as string,
              type: file.type.startsWith("image/") ? "image" : "pdf",
            },
          ]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }));
    setFilePreview((prev) => prev.filter((_, i) => i !== index));
  };

  console.log(formData, "form");
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={() => onClose()}
      placement="center"
      motionPreset="slide-in-bottom"
    >
      <Portal>
        <Dialog.Backdrop bg="blackAlpha.500" />

        <Dialog.Positioner p="4">
          <Dialog.Content
            w="100%"
            maxW="1010px"
            maxH="85vh"
            minW="320px"
            mx="auto"
            borderRadius="xl"
          >
            <Dialog.Header
              position="relative"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Dialog.Title fontSize="2xl" fontWeight="semibold">
                Создание заявки
              </Dialog.Title>

              <Dialog.CloseTrigger asChild>
                <Box
                  position="absolute"
                  right="8"
                  top="50%"
                  transform="translateY(-50%)"
                >
                  <RiCloseLargeFill size={24} color="#B0B0B0" />
                </Box>
              </Dialog.CloseTrigger>
            </Dialog.Header>

            <Dialog.Body px="8" pb="8" overflowY="auto">
              {successMessage && (
                <Box
                  mb="4"
                  p="3"
                  borderRadius="8px"
                  bg="green.100"
                  color="green.800"
                  fontWeight="500"
                  textAlign="center"
                >
                  {successMessage}
                </Box>
              )}
              <form onSubmit={handleSubmit}>
                <Flex gap="6" flexWrap={{ base: "wrap", md: "nowrap" }}>
                  <Box flex="1" minW={{ base: "0", md: "48%" }}>
                    <Field.Root pb="48px">
                      <Field.Label
                        fontWeight={400}
                        color="#1C1C1C"
                        fontSize="12px"
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
                            const [first, ...rest] =
                              selectedPharmacy.name.split(" ");
                            return (
                              <Flex
                                flex="1"
                                justifyContent="flex-start"
                                alignItems="center"
                              >
                                <Text fontSize="sm">
                                  <Text as="span" fontWeight={500}>
                                    {first}
                                  </Text>{" "}
                                  <Text as="span">{rest.join(" ")}</Text>
                                </Text>
                              </Flex>
                            );
                          })()}

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
                        </Flex>
                      ) : (
                        <Select.Root
                          collection={pharmacyCollection}
                          value={
                            formData.pharmacyId ? [formData.pharmacyId] : []
                          }
                          onValueChange={(details) =>
                            handleChange("pharmacyId", details.value[0])
                          }
                        >
                          <Select.Trigger
                            h="5vh"
                            borderRadius={8}
                            children={
                              <Flex
                                w="100%"
                                justifyContent="space-between"
                                alignItems="center"
                              >
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

                    {/* Категория */}
                    <Field.Root pb="16px">
                      <Field.Label
                        fontWeight={400}
                        color="#1C1C1C"
                        fontSize="12px"
                      >
                        Категория заявки
                      </Field.Label>

                      <Select.Root
                        collection={categoryCollection}
                        value={formData.category ? [formData.category] : []}
                        onValueChange={(details) =>
                          handleChange("category", details.value[0])
                        }
                      >
                        <Select.Trigger
                          h="5vh"
                          borderRadius={8}
                          children={
                            <Flex
                              w="100%"
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              <Text
                                color={!formData.category ? "#B0B0B0" : "black"}
                              >
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

                    {/* Гарантия */}

                    <Checkbox.Root
                      mb="16px"
                      checked={formData.isWarranty}
                      onCheckedChange={(e) =>
                        handleChange("isWarranty", !!e.checked)
                      }
                    >
                      <Checkbox.HiddenInput />
                      <Checkbox.Control borderRadius={5} />
                      <Checkbox.Label fontWeight={400}>
                        Гарантийный случай?
                      </Checkbox.Label>
                    </Checkbox.Root>
                    {submitStep === "confirm" && (
                      <Grid templateColumns="1fr 1fr" gap="12px">
                        <Box
                          bg="#FFFAD4"
                          p="10px"
                          borderRadius="10px"
                          h="fit-content"
                          minH="0"
                        >
                          <Flex align="center" gap="2" mb="2">
                            <IoMdWarning />
                            <Text fontWeight="400" fontSize="10px">
                              Заявка нужна, если:
                            </Text>
                          </Flex>
                          <List.Root pl="20px" fontWeight="400" fontSize="10px">
                            {helpNeeded.map((item, i) => (
                              <List.Item
                                _marker={{
                                  color: "black",
                                  fontSize: "12px",
                                  marginInlineEnd: "4px",
                                }}
                                lineHeight="10px"
                                key={i}
                                textIndent="-4px"
                              >
                                {item}
                              </List.Item>
                            ))}
                          </List.Root>
                        </Box>

                        <Box
                          bg="#FFEAEA"
                          p="10px"
                          borderRadius="10px"
                          h="fit-content"
                          minH="0"
                        >
                          <Flex align="center" gap="2" mb="2">
                            <RiCloseLargeFill size={12} color="red" />
                            <Text fontWeight="400" fontSize="10px">
                              Заявку создавать не нужно, если:
                            </Text>
                          </Flex>
                          <List.Root pl="20px" fontWeight="400" fontSize="10px">
                            {helpNotNeeded.map((item, i) => (
                              <List.Item
                                key={i}
                                _marker={{
                                  color: "black",
                                  fontSize: "12px",
                                  marginInlineEnd: "4px",
                                }}
                                lineHeight="10px"
                                textIndent="-4px"
                              >
                                {item}
                              </List.Item>
                            ))}
                          </List.Root>
                        </Box>
                      </Grid>
                    )}
                    <FormErrorSummary errors={errors} />
                  </Box>

                  {/* Правая колонка */}
                  <Box flex="1" minW={{ base: "0", md: "48%" }}>
                    {/* Тема */}
                    <Field.Root mb="24px">
                      <Field.Label
                        fontWeight={400}
                        color="#1C1C1C"
                        fontSize="12px"
                      >
                        Тема заявки
                      </Field.Label>
                      <Textarea
                        placeholder="Дайте заявке краткое название: например, сломался холодильник или не работает кондиционер"
                        borderRadius={8}
                        minHeight="7.6vh"
                        value={formData.topic}
                        onChange={(e) => handleChange("topic", e.target.value)}
                        rows={3}
                      />
                    </Field.Root>

                    {/* Приоритет */}
                    <Field.Root mb="24px">
                      <Field.Label
                        fontWeight={400}
                        color="#1C1C1C"
                        fontSize="12px"
                      >
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
                            <Flex
                              w="100%"
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              <Flex
                                flexWrap="nowrap"
                                alignItems="center"
                                gap={2}
                                fontSize="12px"
                              >
                                {selectedPriority?.icon}
                                <Text fontWeight={500}>
                                  {selectedPriority?.label}
                                </Text>
                                <Text color="#B0B0B0">
                                  {selectedPriority?.desc}
                                </Text>
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

                    {/* Описание */}
                    <Field.Root mb="24px">
                      <Field.Label
                        fontWeight={400}
                        color="#1C1C1C"
                        fontSize="12px"
                      >
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
                        onChange={(e) =>
                          handleChange("description", e.target.value)
                        }
                        rows={8}
                      />
                    </Field.Root>

                    {/* Файлы */}
                    <Field.Root>
                      <Field.Label
                        fontWeight={400}
                        color="#1C1C1C"
                        fontSize="12px"
                      >
                        Прикрепите файлы
                      </Field.Label>
                      <UploadFile
                        fileInputRef={fileInputRef}
                        filePreview={filePreview}
                        removeFile={removeFile}
                      />
                    </Field.Root>
                  </Box>
                </Flex>
                <Input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*,.pdf"
                  onChange={handleFileUpload}
                  display="none"
                />
                {/* Кнопки */}
                <Flex gap="3" mt="8" fontWeight={400} fontSize="16px">
                  <Button
                    type="submit"
                    color="white"
                    px="6"
                    borderRadius="5px"
                    _hover={{ bg: "#329a38" }}
                  >
                    Создать заявку
                  </Button>
                  <Button
                    variant="outline"
                    borderColor="black"
                    px="6"
                    borderRadius="5px"
                    onClick={() => {
                      onClose();
                      resetForm();
                    }}
                    _hover={{ bg: "red.300" }}
                    bg="transparent"
                  >
                    Отмена
                  </Button>
                </Flex>
              </form>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
