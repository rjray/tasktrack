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
  allUsers,
  currentUser,
  showCompleted,
  setShowNew,
  setShowUpdate,
  setShowDelete,
  setSelectedTask,
}) => {
  const isAccessible = taskAccessible(task, currentUser._id);
  const isOwner = task.owner === currentUser._id;
  const isSubTask = task.parentId;

  let subTaskTable = null;
  if (!isSubTask) {
    const subtasks = showCompleted
      ? task.subtaskList
      : task.subtaskList.filter((i) => i.status !== taskStatusMap.COMPLETED);
    subTaskTable = subtasks.length ? (
      <TaskTable
        tasks={subtasks}
        allUsers={allUsers}
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
            disabled={!isAccessible}
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
            disabled={isSubTask || !isAccessible}
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
            disabled={!isOwner}
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
        <Col xs={12} md={task.notes ? 6 : 12}>
          <Row>
            <Col>
              <strong>Description:</strong>
            </Col>
          </Row>
          <Row>
            <Col>{task.description}</Col>
          </Row>
        </Col>
        {task.notes && (
          <Col xs={12} md={6}>
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
      <Row>
        <Col>
          <Row>
            <Col>
              <strong>Owner:</strong> {allUsers[task.owner]}
            </Col>
          </Row>
        </Col>
      </Row>
      {task.assignedTo && (
        <Row>
          <Col>
            <Row>
              <Col>
                <strong>Assigned To:</strong> {allUsers[task.assignedTo]}
              </Col>
            </Row>
          </Col>
        </Row>
      )}
      <Row>
        <Col>
          <Row>
            <Col>
              <strong>Created:</strong> {formatDate(task.createdAt)}
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col>
          <Row>
            <Col>
              <strong>Last Updated:</strong> {formatDate(task.updatedAt)}
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col>
          <Row>
            <Col>
              <strong>Due:</strong> {formatDate(task.dueAt)}
            </Col>
          </Row>
        </Col>
      </Row>
      {subTaskTable && <Row className="mx-3">{subTaskTable}</Row>}
    </Container>
  );
};

const formatHeader = (header, title) => (
  <span title={title}>
    <strong>{header}</strong>
  </span>
);

const TaskTable = ({
  tasks,
  allUsers,
  currentUser,
  subtable,
  showCompleted,
  ...props
}) => {
  const [showNew, setShowNew] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

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
      name: formatHeader("Owner", "Task owner"),
      selector: "owner",
      sortable: false,
      maxWidth: "10%",
      cell: (row) => allUsers[row.owner],
    },
    {
      name: formatHeader("Assigned", "Person to whom this is assigned"),
      selector: "assignedTo",
      sortable: false,
      maxWidth: "10%",
      cell: (row) => allUsers[row.assignedTo] || "",
    },
    {
      name: formatHeader("Status", "Task status"),
      selector: "status",
      sortable: true,
      cell: (row) => taskStatusList[row.status],
    },
    {
      name: formatHeader("Due", "When this task is due"),
      selector: "dueAt",
      sortable: true,
      hide: "md",
      cell: (row) => formatDate(row.dueAt),
    },
  ];

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
    allUsers,
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
        defaultSortField="priority"
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
        allUsers={allUsers}
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
        allUsers={allUsers}
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
