import { Box, Button, Tabs, useBreakpointValue } from "@chakra-ui/react";

import type { Status } from "../lib/types";
import { statusTabs } from "../lib/mockData";
import { MdOutlineFilterAlt } from "react-icons/md";

interface StatusTabsProps {
  onStatusChange: (status: Status | "all") => void;
  showOnlyMine: boolean;
  onShowOnlyMineChange: (value: boolean) => void;
  activeStatus: Status | "all";
}

export function StatusTabs({
  onStatusChange,
  showOnlyMine,
  onShowOnlyMineChange,
  activeStatus,
}: StatusTabsProps) {
  const tabsForRender = useBreakpointValue({
    base: (() => {
      const last = statusTabs[statusTabs.length - 1];
      const rest = statusTabs.slice(0, statusTabs.length - 1);
      return [last, ...rest];
    })(),
    md: statusTabs,
  });
  console.log(tabsForRender, "tabsForRender");
  return (
    <Tabs.Root
      value={activeStatus === "all" ? undefined : activeStatus}
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
      <Button
        px="12px"
        py="4px"
        bg={activeStatus === "all" ? "#F1F1F1" : "black"}
        display={{ base: "flex", md: "none" }}
        borderRadius="sm"
        justifyContent="center"
        alignItems="center"
        onClick={() => onStatusChange("all")}
      >
        <MdOutlineFilterAlt
          size="16px"
          color={activeStatus === "all" ? "black" : "white"}
        />
      </Button>
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
              _hover={{
                transform: "scale(1.05)",
                color: "white",
                bg: "green.400",
                transition: "all 0.3s ease",
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
          _hover={{
            transform: "scale(1.05)",
            color: "white",
            bg: "green.400",
            transition: "all 0.3s ease",
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
