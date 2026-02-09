import React, { useState, useRef, useMemo } from "react";
import {
  Box,
  Flex,
  Button,
  Dialog,
  Portal,
  Field,
  Input,
  Text,
  Badge,
  useBreakpointValue,
} from "@chakra-ui/react";

import type {
  FormErrors,
  NewRequestFormData,
  NewRequestModalProps,
} from "../../lib/types";

import { UploadFileDesktop } from "./UploadFileDesktop";
import { RiCloseLargeFill } from "react-icons/ri";
import { IoMdArrowBack } from "react-icons/io";
import { validateForm } from "@/utils/validateForm";
import { FormErrorSummary } from "./FormErrorSummary";
import { FieldPharmacy } from "./Fields/FieldPharmacy";
import { FieldCategory } from "./Fields/FieldCategory";
import { FieldTopic } from "./Fields/FieldTopic";
import { FieldPriority } from "./Fields/FieldPriority";
import { FieldDescription } from "./Fields/FieldDescription";
import { FieldIsWarranty } from "./Fields/FieldIsWarranty";
import { HelpInfo } from "./HelpInfo";
import { GoQuestion } from "react-icons/go";
import { UploadFileMobile } from "./UploadFileMobile";
import { FiFolder } from "react-icons/fi";
import { HelpInfoMobile } from "./HelpInfoMobile";

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
  const [isShowFiles, setShowFiles] = useState(false);
  const [isShowHelpInfo, setShowHelpInfo] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const isMobile = useBreakpointValue({ base: true, xl: false });
  const validationForm = useMemo(() => {
    return Object.keys(validateForm(formData)).length === 0;
  }, [formData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (submitStep === "form") {
      const validationErrors = validateForm(formData);
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length > 0) {
        return;
      }
      if (isMobile) {
        console.log("formData", formData);
        setSuccessMessage("Ваша заявка успешно отправлена!");

        resetForm();
        setSubmitStep("form");

        setTimeout(() => {
          setSuccessMessage("");
          onClose();
        }, 2000);
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
    setSubmitStep("form");
    setErrors({});
    setShowFiles(false);
    setShowHelpInfo(true);
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
  // console.log("isMobile", isMobile, window.innerWidth);
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={() => onClose()}
      placement="center"
      size={{ base: isMobile ? "full" : "md" }}
      motionPreset="slide-in-bottom"
    >
      <Portal>
        <Dialog.Backdrop bg="blackAlpha.500" />

        <Dialog.Positioner p={{ base: 0, xl: "4" }}>
          <Dialog.Content
            w="100%"
            maxW="900px"
            maxH="670px"
            minW="320px"
            mx="auto"
            borderRadius={{ base: 0, xl: "xl" }}
          >
            {!isShowHelpInfo ? (
              <HelpInfoMobile setShowHelpInfo={setShowHelpInfo} />
            ) : !isShowFiles ? (
              <>
                <Dialog.Header
                  display="flex"
                  justifyContent={{ base: "flex-start", xl: "space-between" }}
                  alignItems="center"
                  border={{ base: "1px solid #DDDDDD", xl: "none" }}
                >
                  {isMobile && (
                    <Dialog.CloseTrigger
                      cursor="pointer"
                      asChild
                      position="relative"
                      top="0"
                      onClick={() => resetForm()}
                    >
                      <IoMdArrowBack size={30} color="black" />
                    </Dialog.CloseTrigger>
                  )}
                  <Dialog.Title fontSize="2xl" fontWeight="semibold">
                    Создание заявки
                  </Dialog.Title>

                  {!isMobile && (
                    <Dialog.CloseTrigger
                      asChild
                      position="relative"
                      top="0"
                      cursor="pointer"
                      onClick={() => resetForm()}
                    >
                      <RiCloseLargeFill size={24} color="#B0B0B0" />
                    </Dialog.CloseTrigger>
                  )}
                </Dialog.Header>

                <Dialog.Body
                  px="8"
                  pb="8"
                  overflowY="auto"
                  display="flex"
                  flexDirection="column"
                  flex={1}
                >
                  <form onSubmit={handleSubmit}>
                    <Flex gap="6" flexWrap={{ base: "wrap", xl: "nowrap" }}>
                      <Box flex="1" minW={{ base: "100%", xl: "48%" }}>
                        <FieldPharmacy
                          setFormData={setFormData}
                          handleChange={handleChange}
                          formData={formData}
                        />
                        <FieldCategory
                          handleChange={handleChange}
                          formData={formData}
                        />
                        <Flex justifyContent="space-between">
                          <FieldIsWarranty
                            handleChange={handleChange}
                            formData={formData}
                          />

                          {validationForm && (
                            <Button
                              display={{ base: "flex", xl: "none" }}
                              gap="5px"
                              bg="inherit"
                              p={0}
                              justifyContent="center"
                              alignItems="center"
                              onClick={() => setShowHelpInfo((e) => !e)}
                            >
                              <GoQuestion size="14px" color="#440AF1" />
                              <Text color="#440AF1">Проверь себя</Text>
                            </Button>
                          )}
                        </Flex>
                        {!isMobile && submitStep === "confirm" && <HelpInfo />}
                        {!isMobile && <FormErrorSummary errors={errors} />}
                      </Box>

                      {/* Правая колонка */}
                      <Box flex="1" minW={{ base: "0", xl: "48%" }}>
                        <FieldTopic
                          handleChange={handleChange}
                          formData={formData}
                        />

                        <FieldPriority
                          handleChange={handleChange}
                          formData={formData}
                        />

                        <FieldDescription
                          handleChange={handleChange}
                          formData={formData}
                        />
                        {isMobile && <FormErrorSummary errors={errors} />}

                        {/* Файлы */}
                        <Field.Root
                          display={{ base: "none", xl: "block" }}
                          id="file"
                        >
                          <Field.Label
                            fontWeight={400}
                            color="#1C1C1C"
                            fontSize="12px"
                            pb={1}
                          >
                            Прикрепите файлы
                          </Field.Label>
                          <UploadFileDesktop
                            fileInputRef={fileInputRef}
                            filePreview={filePreview}
                            removeFile={removeFile}
                          />
                          <Input
                            id="file"
                            ref={fileInputRef}
                            type="file"
                            multiple
                            accept="image/*,.pdf"
                            onChange={handleFileUpload}
                            display="none"
                          />
                        </Field.Root>
                      </Box>
                    </Flex>

                    {/* Кнопки */}
                    {!isMobile && (
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
                            resetForm();
                            onClose();
                          }}
                          _hover={{ bg: "red.300" }}
                          bg="transparent"
                        >
                          Отмена
                        </Button>
                      </Flex>
                    )}
                  </form>
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
                  {isMobile && (
                    <Flex flexDirection="column" gap="2px" mt="auto">
                      <Button
                        w="100%"
                        bg="gray.100"
                        color="gray.700"
                        fontWeight="normal"
                        borderRadius="4px"
                        mb="3"
                        onClick={() => setShowFiles(true)}
                      >
                        <FiFolder />
                        <Text color="black" ml="2">
                          Прикрепленные файлы
                        </Text>
                        {formData.files.length > 0 && (
                          <Badge
                            ml="2"
                            bg="white"
                            color="black"
                            borderRadius="full"
                          >
                            {formData.files.length}
                          </Badge>
                        )}
                      </Button>
                      <Button
                        type="submit"
                        w="100%"
                        color="white"
                        fontWeight="normal"
                        borderRadius="4px"
                        onClick={handleSubmit}
                      >
                        Создать заявку
                      </Button>
                    </Flex>
                  )}
                </Dialog.Body>
              </>
            ) : (
              <UploadFileMobile
                setShowFiles={setShowFiles}
                filePreview={filePreview}
                removeFile={removeFile}
                fileInputRef={fileInputRef}
                handleFileUpload={handleFileUpload}
              />
            )}
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
