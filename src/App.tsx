import { Box } from "@chakra-ui/react";
import { useMemo, useState } from "react";

import { SearchBar } from "./components/SearchBar";
import { StatusTabs } from "./components/StatusTabs";

import { RequestsTable } from "./components/RequestsTable/RequestsTable";

import { mockRequests } from "./lib/mock-data";
import type { Status } from "./lib/types";
import { Header } from "./components/header";

export default function App() {
  const [activeTab, setActiveTab] = useState("requests");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeStatus, setActiveStatus] = useState<Status | "all">("all");
  const [showOnlyMine, setShowOnlyMine] = useState(false);

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
    <Box minH="100vh" bg="white">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <Box
        mx="auto"
        py={{ base: "4", lg: "6" }}
        px={{ base: "19px", lg: "40px" }}
      >
        <Box display="flex" flexDirection="column" gap={{ base: "4", lg: "6" }}>
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          <StatusTabs
            onStatusChange={setActiveStatus}
            showOnlyMine={showOnlyMine}
            onShowOnlyMineChange={setShowOnlyMine}
          />

          <Box bg="white">
            <RequestsTable requests={filteredRequests} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
