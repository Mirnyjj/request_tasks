import { Table } from "@chakra-ui/react";
import {
  PRIORITY_HEADERS,
  REQUEST_MOCKS,
  REQUEST_STATUS_TABS,
  REQUEST_TABLE_HEADERS,
} from "../../mocks";

export const TableRequest = () => {
  return (
    <Table.Root size="sm" variant="outline">
      <Table.ColumnGroup>
        {/* <Table.Column htmlWidth="50%" /> */}
        {/* <Table.Column htmlWidth="40%" /> */}
        <Table.Column />
        <Table.Column />
        <Table.Column />
        <Table.Column />
        <Table.Column />
        <Table.Column />
        <Table.Column />
        <Table.Column />
        <Table.Column />
        <Table.Column />
        <Table.Column />
      </Table.ColumnGroup>
      <Table.Header>
        <Table.Row>
          {Object.values(REQUEST_TABLE_HEADERS).map((item, ind) => (
            <Table.ColumnHeader key={ind}>{item}</Table.ColumnHeader>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {REQUEST_MOCKS.map((item) => (
          <Table.Row key={item.id}>
            <Table.Cell>{item.id}</Table.Cell>
            <Table.Cell>
              {item.pharmacy.id} {item.pharmacy.city} {item.pharmacy.address}
            </Table.Cell>
            <Table.Cell>{item.createdAt}</Table.Cell>
            <Table.Cell>{PRIORITY_HEADERS[item.priority]}</Table.Cell>
            <Table.Cell>{item.subject}</Table.Cell>
            <Table.Cell>{item.category}</Table.Cell>
            <Table.Cell>{item.technician}</Table.Cell>
            <Table.Cell>{item.reaction}</Table.Cell>
            <Table.Cell>{item.resolution}</Table.Cell>
            <Table.Cell>
              {REQUEST_STATUS_TABS[item.status].replace(/ы$/, "а")}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};
