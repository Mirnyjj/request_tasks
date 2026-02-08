import {
  Box,
  Button,
  Dialog,
  Flex,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import type { ChangeEvent, Dispatch, RefObject, SetStateAction } from "react";
import { FiPlus, FiX } from "react-icons/fi";
import { IoMdArrowBack } from "react-icons/io";

type PropsUploadFileMobile = {
  setShowFiles: Dispatch<SetStateAction<boolean>>;
  filePreview: {
    name: string;
    url: string;
    type: string;
  }[];
  removeFile: (index: number) => void;
  fileInputRef: RefObject<HTMLInputElement | null>;
  handleFileUpload: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const UploadFileMobile = ({
  setShowFiles,
  filePreview,
  removeFile,
  fileInputRef,
  handleFileUpload,
}: PropsUploadFileMobile) => {
  return (
    <>
      <Dialog.Header
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        border="1px solid #DDDDDD"
      >
        <Box
          cursor="pointer"
          position="relative"
          top="0"
          onClick={() => setShowFiles(false)}
        >
          <IoMdArrowBack size={30} color="black" />
        </Box>

        <Dialog.Title fontSize="2xl" fontWeight="semibold">
          Прикрепленные файлы
        </Dialog.Title>
      </Dialog.Header>
      <Dialog.Body
        px="8"
        pb="8"
        overflowY="auto"
        display="flex"
        flexDirection="column"
        flex={1}
      >
        {filePreview.map((file, index) => (
          <Flex
            key={`${file.name}-${index}`}
            align="center"
            gap="3"
            p="3"
            bg="#F1F1F1"
            borderRadius="4px"
            mb="3"
          >
            {file.type === "image" ? (
              <Box
                w="60px"
                h="60px"
                borderRadius="4px"
                overflow="hidden"
                bg="gray.100"
                flexShrink={0}
              >
                <Image
                  src={file.url || "/placeholder.svg"}
                  alt={file.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
            ) : (
              <Box
                w="60px"
                h="60px"
                borderRadius="md"
                borderWidth="1px"
                borderColor="red"
                bg="white"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexShrink={0}
              >
                <Text color="red" fontWeight="bold" fontSize="sm">
                  PDF
                </Text>
              </Box>
            )}
            <Text
              flex="1"
              fontSize="sm"
              color="gray.600"
              whiteSpace="nowrap"
              overflow="hidden"
            >
              {file.name}
            </Text>
            <Button
              cursor="pointer"
              p={0}
              bg="inherit"
              onClick={() => removeFile(index)}
            >
              <FiX color="black" size={20} />
            </Button>
          </Flex>
        ))}
        <Flex flexDirection="column" gap="2px" mt="auto">
          <Button
            w="100%"
            color="white"
            fontWeight="normal"
            borderRadius="4px"
            onClick={() => fileInputRef.current?.click()}
          >
            <FiPlus />
            <Text>Прикрепить файлы</Text>
          </Button>
          <Input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,.pdf"
            onChange={handleFileUpload}
            display="none"
          />
        </Flex>
      </Dialog.Body>
    </>
  );
};
