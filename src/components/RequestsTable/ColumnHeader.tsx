import { Box, Flex } from "@chakra-ui/react";
import { MdOutlineFilterAlt } from "react-icons/md";
import FilterDropdown from "./FilterDropdown";
import { useColumnHeader } from "../../../hooks/useColumnHeader";
import { useMemo } from "react";
import type { Request } from "../../lib/types";

interface ColumnHeaderProps {
  label: string;
  data: Request[];

  filterKey?: keyof Request;
  activeFilter?: string | null;
  onFilterChange?: (key: keyof Request, value: string | null) => void;
  alignRight?: boolean;
}

export default function ColumnHeader({
  label,
  data,
  filterKey,
  activeFilter = null,
  onFilterChange,
  alignRight,
}: ColumnHeaderProps) {
  const { isOpen, hasFilter, toggle, close } = useColumnHeader(activeFilter);

  const filterOptions = useMemo(() => {
    if (!filterKey || !data.length) return [];

    const uniqueValues = data
      .map((item) => item[filterKey])
      .filter(Boolean)
      .map(String)
      .filter((value, index, arr) => arr.indexOf(value) === index)
      .sort();

    return [
      { value: "", label: "Все" },
      ...uniqueValues.map((value) => ({
        value,
        label: value.length > 25 ? `${value.slice(0, 22)}...` : value,
      })),
    ];
  }, [data, filterKey]);

  return (
    <Box position="relative">
      <Flex
        align="center"
        gap="1"
        justifyContent="space-between"
        cursor="pointer"
        fontWeight="400"
      >
        {label}

        <Box
          as="button"
          onClick={(e) => {
            e.stopPropagation();
            toggle();
          }}
        >
          <MdOutlineFilterAlt
            size="16px"
            color={hasFilter ? "#38A169" : "#B0B0B0"}
          />
        </Box>
      </Flex>

      {filterKey && (
        <FilterDropdown isOpen={isOpen} onClose={close} alignRight={alignRight}>
          {filterOptions.map((option) => (
            <Box
              key={option.value}
              px="3"
              py="2"
              cursor="pointer"
              fontWeight={activeFilter === option.value ? "medium" : "normal"}
              bg={activeFilter === option.value ? "green.50" : "transparent"}
              _hover={{ bg: "green.100" }}
              onClick={() => {
                onFilterChange?.(filterKey, option.value || null);
                close();
              }}
            >
              {option.label}
            </Box>
          ))}
        </FilterDropdown>
      )}
    </Box>
  );
}
