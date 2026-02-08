import { Skeleton, Table } from "@chakra-ui/react";

const columnWidths = Array(10)
  .fill(0)
  .map((_, i) => i);

export const SkeletonTable = () => {
  return (
    <Table.Root>
      <Table.ColumnGroup>
        {columnWidths.map((i) => (
          <Table.Column key={i} style={{ width: "200px" }} />
        ))}
      </Table.ColumnGroup>

      <Table.Header>
        <Table.Row bg="transparent">
          {columnWidths.map((i) => (
            <Table.ColumnHeader
              key={i}
              backgroundColor="#F1F1F1"
              borderTopLeftRadius={i === 0 ? 8 : undefined}
              borderTopRightRadius={
                i === columnWidths.length - 1 ? 8 : undefined
              }
            >
              <Skeleton height="16px" />
            </Table.ColumnHeader>
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {Array.from({ length: 6 }).map((_, rowIndex) => (
          <Table.Row key={rowIndex}>
            {columnWidths.map((_, cellIndex) => (
              <Table.Cell key={cellIndex}>
                <Skeleton height="16px" />
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};
