import type { SearchBarProps } from "@/lib/types";
import { Button, Flex, Input, InputGroup, Text } from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";

export const RequestToolbarMobile = ({
  onSearchChange,
  searchQuery,
  onCreateNew,
}: SearchBarProps) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <Flex
      display={{ base: "flex", xl: "none" }}
      direction="column"
      width="100%"
      gap="3"
      alignItems="end"
      justifyContent="end"
      pb="30px"
      position="fixed"
      bottom="0"
      right="0"
      height="200px"
      px="4"
      bg="linear-gradient(to top, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.5))"
      zIndex="10"
    >
      <InputGroup
        startElement={<CiSearch size="24px" color="black" />}
        width={isFocused ? "100%" : "100px"}
        bg="white"
        borderColor="black"
        borderWidth="1px"
        borderRadius="4px"
        transition="width 0.3s ease-in-out"
      >
        <Input
          id="search"
          name="search"
          flex={1}
          placeholder="Поиск"
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={searchQuery}
        />
      </InputGroup>

      <Button
        px="15px"
        py="8px"
        borderRadius="4px"
        display="flex"
        alignItems="center"
        gap="5px"
        onClick={onCreateNew}
      >
        <AiOutlinePlus size="14px" />
        <Text>Создать новую заявку</Text>
      </Button>
    </Flex>
  );
};
