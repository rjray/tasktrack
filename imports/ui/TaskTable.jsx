import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import DataTable from "react-data-table-component";
import format from "date-fns/format";
import { Meteor } from "meteor/meteor";

import {
  taskPriorityList,
  taskStatusList,
  taskStatusMap,
  taskAccessible,
} from "../api/tasks";
import NewTaskModal from "./NewTaskModal";
import UpdateTaskModal from "./UpdateTaskModal";
import DeleteTaskModal from "./DeleteTaskModal";

const formatDate = (date) => format(date, "P, p");

const TaskExpand = ({
  data: task,
  currentUser,
  showCompleted,
  setShowNew,
  setShowUpdate,
  setShowDelete,
  setSelectedTask,
}) => {
  const hasNotes = task.notes !== null && task.notes !== "";
  const accessible = taskAccessible(task, currentUser._id);
  const owner = task.owner === currentUser._id;
  const isSubTask = !!task.parentId;

  let subTaskTable = null;
  if (!isSubTask) {
    const subtasks = showCompleted
      ? task.subtaskList
      : task.subtaskList.filter((i) => i.status !== taskStatusMap.COMPLETED);
    subTaskTable = subtasks.length ? (
      <TaskTable
        tasks={subtasks}
        currentUser={currentUser}
        subtable
        title="Sub-Tasks"
      />
    ) : null;
  }

  return (
    <Container fluid className="mt-2 mb-3">
      <Row>
        <Col xs={6}>
          <Button
            className="mb-3"
            disabled={!accessible}
            onClick={() => {
              setSelectedTask(task);
              setShowUpdate(true);
            }}
          >
            Edit
          </Button>
          &nbsp;
          <Button
            className="mb-3"
            disabled={isSubTask || !accessible}
            onClick={() => {
              setSelectedTask(task);
              setShowNew(true);
            }}
          >
            Sub-Task
          </Button>
          &nbsp;
          <Button
            className="mb-3"
            disabled={!owner}
            onClick={() => {
              setSelectedTask(task);
              setShowDelete(true);
            }}
          >
            Delete
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Row>
            <Col>
              <strong>Name:</strong>
            </Col>
          </Row>
          <Row>
            <Col>{task.name}</Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={hasNotes ? 6 : 12}>
          <Row>
            <Col>
              <strong>Description:</strong>
            </Col>
          </Row>
          <Row>
            <Col>{task.description}</Col>
          </Row>
        </Col>
        {hasNotes && (
          <Col xs={12} md={hasNotes ? 6 : 12}>
            <Row>
              <Col>
                <strong>Notes:</strong>
              </Col>
            </Row>
            <Row>
              <Col>{task.notes}</Col>
            </Row>
          </Col>
        )}
      </Row>
      {subTaskTable && <Row className="mx-3">{subTaskTable}</Row>}
      <Row>
        <Col>
          <Row>
            <Col>
              <strong>Created:</strong>
            </Col>
          </Row>
          <Row>
            <Col>{formatDate(task.createdAt)}</Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col>
          <Row>
            <Col>
              <strong>Last Updated:</strong>
            </Col>
          </Row>
          <Row>
            <Col>{formatDate(task.updatedAt)}</Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col>
          <Row>
            <Col>
              <strong>Due:</strong>
            </Col>
          </Row>
          <Row>
            <Col>{formatDate(task.dueAt)}</Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

const formatHeader = (header, title) => (
  <span title={title}>
    <strong>{header}</strong>
  </span>
);

const columns = [
  {
    name: formatHeader("Name", "Task name"),
    selector: "name",
    sortable: true,
  },
  {
    name: formatHeader("S", "Number of sub-tasks"),
    selector: "subtaskCount",
    sortable: false,
    width: "4rem",
  },
  {
    name: formatHeader("Priority", "Task priority"),
    selector: "priority",
    sortable: true,
    hide: "md",
    cell: (row) => taskPriorityList[row.priority],
  },
  {
    name: formatHeader("Status", "Task status"),
    selector: "status",
    sortable: true,
    cell: (row) => taskStatusList[row.status],
  },
  {
    name: formatHeader("Created", "When this task was created"),
    selector: "createdAt",
    sortable: true,
    hide: "md",
    cell: (row) => formatDate(row.createdAt),
  },
  {
    name: formatHeader("Due", "When this task is due"),
    selector: "dueAt",
    sortable: true,
    hide: "md",
    cell: (row) => formatDate(row.dueAt),
  },
];

const TaskTable = ({
  tasks,
  currentUser,
  subtable,
  showCompleted,
  ...props
}) => {
  const [showNew, setShowNew] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const pagination =
    tasks.length < 11
      ? {}
      : {
          pagination: true,
          paginationPerPage: 10,
        };

  const teProps = {
    setShowNew,
    setShowUpdate,
    setShowDelete,
    setSelectedTask,
    currentUser,
    showCompleted,
  };

  const tableColumns = [...columns];
  if (subtable) tableColumns.splice(1, 1);

  return (
    <>
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
        columns={tableColumns}
        expandableRows
        expandOnRowClicked
        expandableRowsHideExpander
        expandableRowsComponent={<TaskExpand {...teProps} />}
        {...pagination}
        {...props}
      />
      <NewTaskModal
        show={showNew}
        setShow={setShowNew}
        currentUser={currentUser}
        parent={selectedTask}
        submitHandler={(values, formikBag) => {
          Meteor.call("tasks.create", values);
          formikBag.setSubmitting(false);
          setShowNew(false);
        }}
      />
      <UpdateTaskModal
        show={showUpdate}
        setShow={setShowUpdate}
        currentUser={currentUser}
        task={selectedTask}
        submitHandler={(values, formikBag) => {
          Meteor.call("tasks.update", selectedTask._id, values);
          formikBag.setSubmitting(false);
          setShowUpdate(false);
        }}
      />
      <DeleteTaskModal
        show={showDelete}
        setShow={setShowDelete}
        task={selectedTask}
        submitHandler={() => {
          Meteor.call("tasks.delete", selectedTask._id);
          // formikBag.setSubmitting(false);
          setShowDelete(false);
        }}
      />
    </>
  );
};

export default TaskTable;
