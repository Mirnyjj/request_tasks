import { Box } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { Header } from "./components/Header";
import { SearchBar } from "./components/SearchBar";
import { StatusTabs } from "./components/StatusTabs";
import { RequestCardsMobile } from "./components/RequestCardsMobile";
import { RequestsTable } from "./components/RequestsTable/RequestsTable";
import { NewRequestModal } from "./components/Modal/NewRequestModal";
import { mockRequests } from "./lib/mockData";
import type { Status } from "./lib/types";
import { RequestToolbarMobile } from "./components/RequestToolbarMobile";

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
      px={1}
      pb={{ base: 0, xl: "120px" }}
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
        activeStatus={activeStatus}
        onStatusChange={setActiveStatus}
        showOnlyMine={showOnlyMine}
        onShowOnlyMineChange={setShowOnlyMine}
      />

      <RequestCardsMobile requests={filteredRequests} />

      <Box
        bg="white"
        w="full"
        px="40px"
        display={{ base: "none", xl: "inline-block" }}
      >
        <RequestsTable requests={filteredRequests} />
      </Box>

      <RequestToolbarMobile
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onCreateNew={() => setIsModalOpen(true)}
      />

      <NewRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Box>
  );
}
