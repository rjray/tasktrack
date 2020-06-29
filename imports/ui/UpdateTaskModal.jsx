import React from "react";
import Modal from "react-bootstrap/Modal";

import TaskForm from "./TaskForm";

const UpdateTaskModal = ({
  show,
  setShow,
  submitHandler,
  currentUser,
  task,
}) => (
  <Modal show={show} onHide={() => setShow(false)}>
    <Modal.Header closeButton>
      <Modal.Title>Update Task</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <TaskForm
        type="update"
        currentUser={currentUser}
        task={task}
        submitHandler={submitHandler}
      />
    </Modal.Body>
  </Modal>
);

export default UpdateTaskModal;
