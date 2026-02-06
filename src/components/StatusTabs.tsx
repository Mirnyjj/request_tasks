import { Box, Tabs } from "@chakra-ui/react";
import type { Status } from "../lib/types";
import { statusTabs } from "../lib/mock-data";
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
  return (
    <Tabs.Root variant="enclosed">
      <Tabs.List display="flex" gap="10px" bg="white" p={0}>
        {statusTabs.map((tab) => (
          <Tabs.Trigger
            bg="#F1F1F1"
            key={tab.value}
            value={tab.value}
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
        <Box w="3px" bg="#D9E1EC" mx={2} />
        <Tabs.Trigger
          bg="#F1F1F1"
          value="myRequests"
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
