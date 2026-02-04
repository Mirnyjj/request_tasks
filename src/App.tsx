import { Box, Container, Flex } from "@chakra-ui/react";
import { NavigationPanel } from "./components/ui/NavigationPanel";
import { RequestManager } from "./components/ui/RequestManager";
import { TabsGroup } from "./components/ui/TabsGroup";
import { TableRequest } from "./components/ui/TableRequest";

export default function App() {
  return (
    <Box minH="100vh" bg="white">
      <NavigationPanel />

      <Container px="40px">
        <Flex w="100%" flexDirection="column" align="start" gap={4}>
          <RequestManager />
          <TabsGroup />
          <TableRequest />
        </Flex>
      </Container>
    </Box>
  );
}
