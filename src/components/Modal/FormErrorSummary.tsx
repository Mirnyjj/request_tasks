import type { FormErrors } from "@/lib/types";
import { Box, Text, List } from "@chakra-ui/react";
import { IoMdWarning } from "react-icons/io";

interface FormErrorSummaryProps {
  errors: FormErrors;
}

export function FormErrorSummary({ errors }: FormErrorSummaryProps) {
  const errorMessages = Object.values(errors).filter(Boolean);

  if (errorMessages.length === 0) return null;

  return (
    <Box
      bg="#FFEAEA"
      border="1px solid #F5C2C7"
      borderRadius="8px"
      p="12px"
      my="16px"
    >
      <Text
        display="flex"
        alignItems="center"
        gap="6px"
        fontWeight={500}
        fontSize="12px"
        mb="8px"
        color="#B42318"
      >
        <IoMdWarning />
        Пожалуйста, исправьте ошибки:
      </Text>

      <List.Root pl="20px" fontSize="10px">
        {errorMessages.map((message, index) => (
          <List.Item
            key={index}
            _marker={{
              color: "black",
              fontSize: "12px",
              marginInlineEnd: "4px",
            }}
            lineHeight="10px"
            textIndent="-4px"
          >
            {message}
          </List.Item>
        ))}
      </List.Root>
    </Box>
  );
}
