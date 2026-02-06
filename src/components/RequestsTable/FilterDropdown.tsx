import { Box } from "@chakra-ui/react";
import { useEffect, useRef } from "react";

interface FilterDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  alignRight?: boolean;
}

export default function FilterDropdown({
  isOpen,
  onClose,
  children,
  alignRight = false,
}: FilterDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <Box
      ref={dropdownRef}
      position="absolute"
      top="100%"
      left={alignRight ? "auto" : 0}
      right={alignRight ? 0 : "auto"}
      mt="1"
      bg="white"
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="md"
      boxShadow="lg"
      zIndex="50"
      minW="200px"
      p="2"
    >
      {children}
    </Box>
  );
}
