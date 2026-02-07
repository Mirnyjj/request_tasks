import { Box, Text, Badge, Flex } from "@chakra-ui/react";
import { FiCheckCircle } from "react-icons/fi";
import { BsDiamondFill, BsChevronUp, BsChevronDoubleUp } from "react-icons/bs";

import type { Priority, Request, Status } from "../lib/types";

interface RequestCardsProps {
  requests: Request[];
}

function PriorityIcon({ priority }: { priority: Priority }) {
  const config = {
    critical: { icon: "doubleUp", color: "red.500" },
    high: { icon: "up", color: "orange.500" },
    medium: { icon: "diamond", color: "orange.400" },
    low: { icon: "diamond", color: "gray.400" },
  };
  const { icon, color } = config[priority];
  return (
    <Box color={color}>
      {icon === "doubleUp" && <BsChevronDoubleUp size={16} />}
      {icon === "up" && <BsChevronUp size={16} />}
      {icon === "diamond" && <BsDiamondFill size={16} />}
    </Box>
  );
}

function StatusBadge({ status }: { status: Status }) {
  const config: Record<Status, { bg: string; color: string; label: string }> = {
    new: { bg: "red.50", color: "red.600", label: "Новая" },
    "in-progress": { bg: "yellow.100", color: "yellow.800", label: "В работе" },
    ready: { bg: "green.100", color: "green.700", label: "Готово" },
    closed: { bg: "gray.100", color: "gray.700", label: "Закрыто" },
    rejected: { bg: "red.100", color: "red.700", label: "Отклонено" },
    pending: { bg: "gray.100", color: "gray.700", label: "На паузе" },
    "waiting-parts": {
      bg: "orange.50",
      color: "orange.700",
      label: "Ожидает запчасти",
    },
  };
  const { bg, color, label } = config[status];
  return (
    <Badge
      bg={bg}
      color={color}
      px="3"
      py="1"
      borderRadius="md"
      fontWeight="medium"
      fontSize="xs"
    >
      {label}
    </Badge>
  );
}

function groupByDate(requests: Request[]) {
  const groups: { label: string; requests: Request[] }[] = [
    { label: "СЕГОДНЯ", requests: [] },
    { label: "ВЧЕРА", requests: [] },
    { label: "В АВГУСТЕ 2025", requests: [] },
  ];

  for (let i = 0; i < requests.length; i++) {
    const groupIndex = i % 3;
    groups[groupIndex].requests.push(requests[i]);
  }

  return groups.filter((g) => g.requests.length > 0);
}

export function RequestCards({ requests }: RequestCardsProps) {
  const groups = groupByDate(requests);

  if (requests.length === 0) {
    return (
      <Flex
        direction="column"
        align="center"
        justify="center"
        py="16"
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
    <Box display="flex" flexDirection="column" gap="4" pb="140px">
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
            {group.requests.map((request) => (
              <Box
                key={request.id}
                bg="white"
                borderWidth="1px"
                borderColor="gray.200"
                borderRadius="xl"
                p="4"
                cursor="pointer"
                _hover={{ borderColor: "gray.300" }}
              >
                <Flex justify="space-between" align="flex-start" mb="3">
                  <Text fontWeight="medium" fontSize="sm" flex="1" pr="2">
                    {request.topic}
                  </Text>
                  <Flex align="center" gap="2">
                    <PriorityIcon priority={request.priority} />
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
                  {request.resolutionTime && (
                    <Flex align="center" gap="1" color="green.500">
                      <FiCheckCircle size={16} />
                      <Text fontSize="sm" fontWeight="medium">
                        {request.resolutionTime}
                      </Text>
                    </Flex>
                  )}
                </Flex>
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
}
