import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import DataTable from "react-data-table-component";
import format from "date-fns/format";

import { taskPriorities, taskStatusList } from "../api/tasks";

const TaskExpand = ({ data: task }) => {
  return (
    <Container fluid className="mt-2 mb-3">
      <Row>
        <Col xs={6}>
          <Button>Edit</Button>
        </Col>
        <Col xs={6} className="text-right">
          <Button>Delete</Button>
        </Col>
      </Row>
    </Container>
  );
};

const columns = [
  {
    name: <b>Name</b>,
    selector: "name",
    sortable: true,
  },
  {
    name: <b>Priority</b>,
    selector: "priority",
    sortable: true,
    cell: (row) => taskPriorities[row.priority],
  },
  {
    name: <b>Status</b>,
    selector: "status",
    sortable: true,
    cell: (row) => taskStatusList[row.status],
  },
  {
    name: <b>Created</b>,
    selector: "createdAt",
    sortable: true,
    hide: "md",
    cell: (row) => format(row.createdAt, "E, MMM do yyyy, h:mma"),
  },
  {
    name: <b>Due</b>,
    selector: "dueAt",
    sortable: true,
    cell: (row) => format(row.dueAt, "E, MMM do yyyy, h:mma"),
  },
];

const TaskTable = ({ tasks }) => {
  const pagination =
    tasks.length < 11
      ? {}
      : {
          pagination: true,
          paginationPerPage: 10,
        };

  return (
    <DataTable
      responsive
      dense
      noDataComponent={<p>No tasks to display.</p>}
      keyField="_id"
      defaultSortField="dueAt"
      defaultSortAsc={false}
      highlightOnHover
      pointerOnHover
      data={tasks}
      columns={columns}
      expandableRows
      expandOnRowClicked
      expandableRowsHideExpander
      expandableRowsComponent={<TaskExpand />}
      {...pagination}
    />
  );
};

export default TaskTable;
