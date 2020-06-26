import React from "react";
import DataTable from "react-data-table-component";
import format from "date-fns/format";

import { taskPriorities, taskStatusList } from "../api/tasks";

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
    name: <b>Due</b>,
    selector: "dueAt",
    sortable: true,
    cell: (row) => format(row.dueAt, "E, MMM do yyyy, h:mma"),
  },
];

const TaskTable = ({ tasks }) => {
  const pagination =
    tasks.length < 26
      ? {}
      : {
          pagination: true,
          paginationPerPage: 25,
        };

  return (
    <DataTable
      striped
      responsive
      highlightOnHover
      pointerOnHover
      data={tasks}
      columns={columns}
      {...pagination}
    />
  );
};

export default TaskTable;
