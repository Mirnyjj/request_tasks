import { Box, Text, Badge, Flex } from "@chakra-ui/react";

import type { Request } from "@/lib/types";
import { renderSLACell } from "./RequestsTable/RenderSLACell";
import PriorityBadge from "./RequestsTable/PriorityBadge";
import StatusBadge from "./RequestsTable/StatusBadge";
import { groupByDate } from "@/utils/groupByDate";

interface RequestCardsProps {
  requests: Request[];
}

export function RequestCards({ requests }: RequestCardsProps) {
  const groups = groupByDate(requests);

  if (requests.length === 0) {
    return (
      <Flex
        direction="column"
        align="center"
        justify="center"
        p="17px"
        color="gray.500"
      >
        <Text fontSize="lg" fontWeight="medium">
          Заявки не найдены
        </Text>
        <Text fontSize="sm">Попробуйте изменить параметры фильтрации</Text>
      </Flex>
    );
  }

  return (
    <Box display="flex" flexDirection="column" gap="4" pb="140px" px="17px">
      {groups.map((group) => (
        <Box key={group.label}>
          <Text
            fontSize="xs"
            fontWeight="bold"
            color="gray.500"
            mb="3"
            letterSpacing="wider"
          >
            {group.label}
          </Text>
          <Box display="flex" flexDirection="column" gap="3">
            {group.requests.map((request, ind) => (
              <Box
                key={ind}
                bg="white"
                borderWidth="1px"
                borderColor="gray.200"
                borderRadius="8px"
                p="4"
                cursor="pointer"
                _hover={{ borderColor: "gray.300" }}
              >
                <Flex justify="space-between" align="flex-start" mb="3">
                  <Text fontWeight="medium" fontSize="sm" flex="1" pr="2">
                    {request.topic}
                  </Text>
                  <Flex align="center" gap="2">
                    <PriorityBadge priority={request.priority} />
                    <StatusBadge status={request.status} />
                  </Flex>
                </Flex>
                <Flex justify="space-between" align="center">
                  <Flex align="center" gap="2">
                    <Badge
                      bg="gray.100"
                      color="gray.700"
                      px="2"
                      py="1"
                      borderRadius="md"
                      fontWeight="medium"
                      fontSize="xs"
                    >
                      {request.id}
                    </Badge>
                    <Text fontSize="xs" color="gray.500">
                      {request.pharmacyAddress}
                    </Text>
                  </Flex>
                  {request.resolutionTime &&
                    renderSLACell({
                      createdAt: request.createdAt,
                      stageTime: request.resolutionTime,
                      priority: request.priority,
                      stage: "resolution",
                      status: request.status,
                    })}
                </Flex>
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
}
