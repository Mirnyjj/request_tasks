import { Box, Flex, Text, Badge } from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi";
import { useState } from "react";

export function MobileHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Box as="header" borderBottomWidth="1px" borderColor="gray.200" bg="white">
      <Flex px="4" h="56px" align="center" justify="space-between">
        <Box position="relative">
          <Flex
            align="center"
            gap="1"
            cursor="pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Text fontSize="xl" fontWeight="bold">
              Заявки
            </Text>
            <FiChevronDown />
          </Flex>
          {menuOpen && (
            <Box
              position="absolute"
              top="100%"
              left="0"
              bg="white"
              borderWidth="1px"
              borderColor="gray.200"
              borderRadius="md"
              shadow="lg"
              py="1"
              minW="150px"
              zIndex="dropdown"
            >
              <Box
                px="4"
                py="2"
                fontSize="sm"
                cursor="pointer"
                _hover={{ bg: "gray.50" }}
                onClick={() => setMenuOpen(false)}
              >
                Заявки
              </Box>
              <Box
                px="4"
                py="2"
                fontSize="sm"
                cursor="pointer"
                _hover={{ bg: "gray.50" }}
                onClick={() => setMenuOpen(false)}
              >
                Отчеты
              </Box>
              <Box
                px="4"
                py="2"
                fontSize="sm"
                cursor="pointer"
                _hover={{ bg: "gray.50" }}
                onClick={() => setMenuOpen(false)}
              >
                Справочники
              </Box>
            </Box>
          )}
        </Box>

        <Box position="relative">
          <Box
            w="32px"
            h="32px"
            borderRadius="full"
            bg="orange.100"
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontSize="xs"
            fontWeight="medium"
            color="orange.700"
          >
            АИ
          </Box>
          <Badge
            position="absolute"
            top="-4px"
            right="-4px"
            bg="green.500"
            color="white"
            borderRadius="full"
            fontSize="xs"
            minW="18px"
            h="18px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            2
          </Badge>
        </Box>
      </Flex>
    </Box>
  );
}
