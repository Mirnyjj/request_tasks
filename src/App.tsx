import { Box } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { Header } from "./components/Header";
import { SearchBar } from "./components/SearchBar";
import { StatusTabs } from "./components/StatusTabs";

import { RequestsTable } from "./components/RequestsTable/RequestsTable";
import { NewRequestModal } from "./components/Modal/NewRequestModal";
import { mockRequests } from "./lib/mockData";
import type { Status } from "./lib/types";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeStatus, setActiveStatus] = useState<Status | "all">("all");
  const [showOnlyMine, setShowOnlyMine] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredRequests = useMemo(() => {
    return mockRequests.filter((request) => {
      const matchesSearch =
        searchQuery === "" ||
        request.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.pharmacyAddress
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesStatus =
        activeStatus === "all" || request.status === activeStatus;

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, activeStatus]);

  return (
    <Box
      minH="100vh"
      bg="white"
      pb={{ base: 0, md: "120px" }}
      display="flex"
      flexDirection="column"
      gap={{ base: "4", lg: "6" }}
    >
      <Header />

      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onCreateNew={() => setIsModalOpen(true)}
      />

      <StatusTabs
        onStatusChange={setActiveStatus}
        showOnlyMine={showOnlyMine}
        onShowOnlyMineChange={setShowOnlyMine}
      />

      <Box bg="white" w="full" px="40px">
        <RequestsTable requests={filteredRequests} />
      </Box>

      <NewRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Box>
  );
}
