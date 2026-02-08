import { Box, Tabs, useBreakpointValue } from "@chakra-ui/react";

import type { Status } from "../lib/types";
import { statusTabs } from "../lib/mockData";
import { MdOutlineFilterAlt } from "react-icons/md";

interface StatusTabsProps {
  onStatusChange: (status: Status | "all") => void;
  showOnlyMine: boolean;
  onShowOnlyMineChange: (value: boolean) => void;
}

export function StatusTabs({
  onStatusChange,
  showOnlyMine,
  onShowOnlyMineChange,
}: StatusTabsProps) {
  const tabsForRender = useBreakpointValue({
    base: (() => {
      const last = statusTabs[statusTabs.length - 1];
      const rest = statusTabs.slice(0, statusTabs.length - 1);
      return [last, ...rest];
    })(),
    md: statusTabs,
  });
  return (
    <Tabs.Root
      variant="enclosed"
      display="flex"
      flexWrap="nowrap"
      gap="10px"
      px={{ md: "40px" }}
      pl={{ base: "19px" }}
      borderBottom={{ base: "none", md: "1px solid #DBE5F2" }}
      pb={{ base: 0, md: "12px" }}
      overflowX="auto"
      whiteSpace="nowrap"
      fontSize={{ base: "14px", md: "16px" }}
      scrollbar="visible"
    >
      <Box
        px="12px"
        py="4px"
        bg="#F1F1F1"
        display={{ base: "flex", md: "none" }}
        borderRadius="sm"
        justifyContent="center"
        alignItems="center"
      >
        <MdOutlineFilterAlt size="16px" color="black" />
      </Box>
      <Tabs.List
        display="inline-flex"
        gap="10px"
        bg="white"
        p={0}
        flexWrap="nowrap"
        flexShrink={0}
      >
        {tabsForRender &&
          tabsForRender.map((tab) => (
            <Tabs.Trigger
              bg="#F1F1F1"
              px={{ base: "12px", md: "17px" }}
              py={{ base: "4px", md: "8px" }}
              key={tab.value}
              value={tab.value}
              whiteSpace="nowrap"
              flexShrink={0}
              minW="fit-content"
              _selected={{
                bg: "black",
                color: "white",
                borderColor: "black",
              }}
              onClick={() => onStatusChange(tab.value)}
            >
              {tab.label}
            </Tabs.Trigger>
          ))}
        <Box w="3px" bg="#D9E1EC" mx={2} flexShrink={0} />
        <Tabs.Trigger
          px={{ base: "12px", md: "17px" }}
          py={{ base: "4px", md: "8px" }}
          bg="#F1F1F1"
          value="myRequests"
          flexShrink={0}
          whiteSpace="nowrap"
          _selected={{
            bg: "black",
            color: "white",
            borderColor: "black",
          }}
          onClick={() => onShowOnlyMineChange(!showOnlyMine)}
        >
          <MdOutlineFilterAlt />
          Показать только мои
        </Tabs.Trigger>
      </Tabs.List>
    </Tabs.Root>
  );
}
