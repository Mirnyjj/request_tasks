import { Box, Tabs } from "@chakra-ui/react";
import { REQUEST_STATUS_TABS } from "../../mocks";
import { MdOutlineFilterAlt } from "react-icons/md";

export const TabsGroup = () => {
  const tabsArray = Object.entries(REQUEST_STATUS_TABS);
  return (
    <Tabs.Root variant="enclosed">
      <Tabs.List display="flex" gap="10px" bg="white" p={0}>
        {tabsArray.slice(0, -1).map(([key, label]) => (
          <Tabs.Trigger
            bg="#F1F1F1"
            key={key}
            value={key}
            _selected={{
              bg: "black",
              color: "white",
              borderColor: "black",
            }}
          >
            {label}
          </Tabs.Trigger>
        ))}
        <Box w="3px" bg="#D9E1EC" mx={2} />
        <Tabs.Trigger
          bg="#F1F1F1"
          value={tabsArray[tabsArray.length - 1][0]}
          _selected={{
            bg: "black",
            color: "white",
            borderColor: "black",
          }}
        >
          <MdOutlineFilterAlt />
          {tabsArray[tabsArray.length - 1][1]}
        </Tabs.Trigger>
      </Tabs.List>
    </Tabs.Root>
  );
};
