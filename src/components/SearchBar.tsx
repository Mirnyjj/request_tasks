import type { SearchBarProps } from "@/lib/types";
import { Flex, Input, Button, InputGroup, Text } from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";

import { MdPictureAsPdf } from "react-icons/md";

export function SearchBar({
  searchQuery,
  onSearchChange,
  onCreateNew,
}: SearchBarProps) {
  return (
    <Flex
      w="100%"
      gap="13px"
      as="nav"
      px="40px"
      align="center"
      wrap="nowrap"
      justify="space-between"
      py={4}
    >
      <InputGroup startElement={<CiSearch size="24px" color="#B0B0B0" />}>
        <Input
          flex={1}
          placeholder="Поиск по номеру или теме заявки"
          onChange={(e) => onSearchChange(e.target.value)}
          value={searchQuery}
        />
      </InputGroup>

      <Button
        px="12.5px"
        py="10px"
        display="flex"
        gap="12px"
        bg="#F1F1F1"
        color="black"
        border="solid 1px"
        borderColor="#D9E1EC"
        borderRadius="4px"
      >
        <MdPictureAsPdf color="grey" size="15px" /> Экспорт
      </Button>
      <Button
        px="15px"
        py="8px"
        display="flex"
        gap="5px"
        borderRadius="4px"
        onClick={onCreateNew}
      >
        <AiOutlinePlus size="14px" />
        <Text>Создать новую заявку</Text>
      </Button>
    </Flex>
  );
}
