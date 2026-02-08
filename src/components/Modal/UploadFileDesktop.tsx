import { Box, Flex, Image, Text } from "@chakra-ui/react";
import type { RefObject } from "react";
import { PiImage } from "react-icons/pi";
import { RiCloseLargeFill } from "react-icons/ri";

type PropsFileUpload = {
  filePreview: {
    name: string;
    url: string;
    type: string;
  }[];
  fileInputRef: RefObject<HTMLInputElement | null>;
  removeFile: (index: number) => void;
};

export const UploadFileDesktop = ({
  filePreview,
  fileInputRef,
  removeFile,
}: PropsFileUpload) => {
  return (
    <Flex gap="4" w="100%">
      <Flex
        w={filePreview.length > 0 ? "50%" : "100%"}
        border="2px dashed"
        borderColor="gray.300"
        borderRadius="lg"
        py="6"
        px="4"
        textAlign="center"
        cursor="pointer"
        _hover={{ borderColor: "gray.400", bg: "gray.50" }}
        onClick={() => fileInputRef.current?.click()}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Text fontSize="sm" color="gray.500" mb="2">
          Выберите или перетащите фото или файл
        </Text>
        <Box color="gray.400">
          <PiImage size={24} />
        </Box>
      </Flex>

      {filePreview.length > 0 && (
        <Box>
          {filePreview.map((file, index) => (
            <Flex
              key={`${file.name}-${index}`}
              align="center"
              gap="2"
              mb="2"
              bg="gray.50"
              px="3"
              py="2"
              borderRadius="md"
            >
              {file.type === "image" ? (
                <Box
                  w="24px"
                  h="24px"
                  borderRadius="sm"
                  overflow="hidden"
                  bg="gray.200"
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
                  color="#C71212"
                  fontSize="8px"
                  fontWeight={500}
                  borderWidth="1px"
                  borderColor="#C71212"
                  px="1"
                >
                  PDF
                </Box>
              )}
              <Text fontSize="sm" maxW="140px">
                {file.name}
              </Text>
              <Box cursor="pointer" onClick={() => removeFile(index)}>
                <RiCloseLargeFill size={24} />
              </Box>
            </Flex>
          ))}
        </Box>
      )}
    </Flex>
  );
};
