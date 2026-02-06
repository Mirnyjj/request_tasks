import { Table, Flex, Text } from "@chakra-ui/react";
import type { ColumnFilters, Request } from "../../lib/types";
import ColumnHeader from "./ColumnHeader";
import PriorityBadge from "./PriorityBadge";
import StatusBadge from "./StatusBadge";
import { useRequestsTable } from "../../../hooks/useRequestTable";
import { MdOutlineFilterAlt } from "react-icons/md";
import { renderSLACell } from "./RenderSLACell";
import { formatDateTimeWithTs } from "@/utils/formatDateTimeWithTs";

interface RequestsTableProps {
  requests: Request[];
  onFiltersChange?: (filters: ColumnFilters) => void;
}

export function RequestsTable({ requests }: RequestsTableProps) {
  const { data, filters, setFilters } = useRequestsTable(requests);

  const handleFilterChange = (key: keyof Request, value: string | null) => {
    setFilters({ ...filters, [key]: value });
  };

  if (data.length === 0) {
    return (
      <Flex
        py="16"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        flexDirection="column"
        color="gray.500"
      >
        <MdOutlineFilterAlt size={32} />
        <Text fontSize="lg" fontWeight="medium">
          Заявки не найдены
        </Text>
        <Text fontSize="sm">Попробуйте изменить параметры фильтрации</Text>
      </Flex>
    );
  }

  return (
    <Table.Root size="sm">
      <Table.Header>
        <Table.Row bg="transparent">
          <Table.ColumnHeader>
            <ColumnHeader
              label="№"
              data={data}
              filterKey="id"
              activeFilter={filters.id}
              onFilterChange={handleFilterChange}
            />
          </Table.ColumnHeader>

          <Table.ColumnHeader>
            <ColumnHeader
              label="Аптека"
              data={data}
              filterKey="pharmacyAddress"
              activeFilter={filters.pharmacyAddress}
              onFilterChange={handleFilterChange}
            />
          </Table.ColumnHeader>

          <Table.ColumnHeader>
            <ColumnHeader
              label="Создана"
              data={data}
              filterKey="createdAt"
              activeFilter={filters.createdAt}
              onFilterChange={handleFilterChange}
            />
          </Table.ColumnHeader>

          <Table.ColumnHeader>
            <ColumnHeader
              label="Приоритет"
              data={data}
              filterKey="priority"
              activeFilter={filters.priority}
              onFilterChange={handleFilterChange}
            />
          </Table.ColumnHeader>

          <Table.ColumnHeader>
            <ColumnHeader
              label="Тема"
              data={data}
              filterKey="topic"
              activeFilter={filters.topic}
              onFilterChange={handleFilterChange}
            />
          </Table.ColumnHeader>

          <Table.ColumnHeader>
            <ColumnHeader
              label="Категория"
              data={data}
              filterKey="category"
              activeFilter={filters.category}
              onFilterChange={handleFilterChange}
            />
          </Table.ColumnHeader>

          <Table.ColumnHeader>
            <ColumnHeader
              label="Техник"
              data={data}
              filterKey="technician"
              activeFilter={filters.technician}
              onFilterChange={handleFilterChange}
            />
          </Table.ColumnHeader>

          <Table.ColumnHeader>
            <ColumnHeader
              label="Реакция"
              data={data}
              filterKey="reactionTime"
              activeFilter={filters.reactionTime}
              onFilterChange={handleFilterChange}
            />
          </Table.ColumnHeader>

          <Table.ColumnHeader>
            <ColumnHeader
              label="Решение"
              data={data}
              filterKey="resolutionTime"
              activeFilter={filters.resolutionTime}
              onFilterChange={handleFilterChange}
            />
          </Table.ColumnHeader>

          <Table.ColumnHeader>
            <ColumnHeader
              label="Статус"
              data={data}
              filterKey="status"
              activeFilter={filters.status}
              onFilterChange={handleFilterChange}
              alignRight={true}
            />
          </Table.ColumnHeader>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {data.map((request) => (
          <Table.Row key={request.id}>
            <Table.Cell>{request.id}</Table.Cell>
            <Table.Cell>
              <Flex gap="2">
                <Text
                  fontWeight={600}
                  fontSize="12px"
                  lineHeight="1"
                  letterSpacing="0.096em"
                  textAlign="center"
                  bg="#F1F1F1"
                  px="3px"
                  py="1px"
                  borderRadius="4px"
                  display="inline-flex"
                  alignItems="center"
                >
                  {request.pharmacyNumber}
                </Text>
                <Text>{request.pharmacyAddress}</Text>
              </Flex>
            </Table.Cell>
            <Table.Cell style={{ padding: 0 }}>
              <Flex
                flexDirection="row"
                flexWrap="wrap"
                boxSizing="border-box"
                gap="4px"
              >
                <Text>{formatDateTimeWithTs(request.createdAt).date}</Text>
                <Text color="grey">
                  {formatDateTimeWithTs(request.createdAt).time}
                </Text>
              </Flex>
            </Table.Cell>
            <Table.Cell>
              <PriorityBadge priority={request.priority} />
            </Table.Cell>
            <Table.Cell>{request.topic}</Table.Cell>
            <Table.Cell>{request.category}</Table.Cell>
            <Table.Cell>
              {request.technician ? (
                request.technician
              ) : (
                <Text color="grey">—</Text>
              )}
            </Table.Cell>
            <Table.Cell>
              {renderSLACell({
                createdAt: request.createdAt,
                stageTime: request.reactionTime,
                priority: request.priority,
                stage: "reaction",
                status: request.status,
              })}
            </Table.Cell>
            <Table.Cell>
              {renderSLACell({
                createdAt: request.createdAt,
                stageTime: request.resolutionTime,
                priority: request.priority,
                stage: "resolution",
                status: request.status,
              })}
            </Table.Cell>
            <Table.Cell>
              <StatusBadge status={request.status} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}
