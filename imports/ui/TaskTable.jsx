import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import DataTable from "react-data-table-component";
import format from "date-fns/format";
import { Meteor } from "meteor/meteor";

import { taskPriorityList, taskStatusList, taskAccessible } from "../api/tasks";
import UpdateTaskModal from "./UpdateTaskModal";
import DeleteTaskModal from "./DeleteTaskModal";

const TaskExpand = ({
  data: task,
  currentUser,
  setShowUpdate,
  setShowDelete,
  setSelectedTask,
}) => {
  const hasNotes = task.notes !== null && task.notes !== "";
  const accessible = taskAccessible(task, currentUser._id);
  const owner = task.owner === currentUser._id;

  return (
    <Container fluid className="mt-2 mb-3">
      <Row className="mb-3">
        <Col xs={6}>
          <Button
            disabled={!accessible}
            onClick={() => {
              setSelectedTask(task);
              setShowUpdate(true);
            }}
          >
            Quick Edit
          </Button>
          &nbsp;
          <Button
            disabled={!accessible}
            onClick={() => {
              setSelectedTask(task);
              setShowUpdate(true);
            }}
          >
            Full Edit
          </Button>
          &nbsp;
          <Button
            disabled={!accessible}
            onClick={() => {
              setSelectedTask(task);
              setShowUpdate(true);
            }}
          >
            Sub-Task
          </Button>
          &nbsp;
          <Button
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
    </Container>
  );
};

const formatDate = (date) => format(date, "P, p");

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
    hide: "md",
    cell: (row) => taskPriorityList[row.priority],
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
    cell: (row) => formatDate(row.createdAt),
  },
  {
    name: <b>Due</b>,
    selector: "dueAt",
    sortable: true,
    cell: (row) => formatDate(row.dueAt),
  },
];

const TaskTable = ({ tasks, currentUser }) => {
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
    setShowUpdate,
    setShowDelete,
    setSelectedTask,
    currentUser,
  };

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
        columns={columns}
        expandableRows
        expandOnRowClicked
        expandableRowsHideExpander
        expandableRowsComponent={<TaskExpand {...teProps} />}
        {...pagination}
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
        task={selectedTask || {}}
        submitHandler={() => {
          Meteor.call("tasks.delete", selectedTask._id);
          setShowDelete(false);
        }}
      />
    </>
  );
};

export default TaskTable;
