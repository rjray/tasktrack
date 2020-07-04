import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { taskStatusMap } from "../api/tasks";

const DeleteTaskModal = ({ show, setShow, submitHandler, task }) => {
  if (!task) return null;

  let subTasksPara = null;
  if (task.subtaskCount) {
    const pl = task.subtaskCount === 1 ? "" : "s";
    const notDone = task.subtaskList.filter(
      (i) => i.status !== taskStatusMap.COMPLETED
    ).length;
    subTasksPara = `This task has ${task.subtaskCount} subtask${pl}`;
    subTasksPara += notDone ? ` (${notDone} not completed).` : ".";
  }

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Update Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          You are about to delete the task, "<b>{task.name}</b>".
        </p>
        {subTasksPara && <p>{subTasksPara}</p>}
        <p>Are you sure?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={submitHandler}>Delete</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteTaskModal;
