import React from "react";
import Modal from "react-bootstrap/Modal";

import TaskForm from "./TaskForm";
import { defaultTaskTemplate } from "../api/tasks";

const NewTaskModal = ({ show, setShow, submitHandler, currentUser }) => (
  <Modal show={show} onHide={() => setShow(false)}>
    <Modal.Header closeButton>
      <Modal.Title>Create New Task</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <TaskForm
        currentUser={currentUser}
        task={defaultTaskTemplate}
        submitHandler={submitHandler}
      />
    </Modal.Body>
  </Modal>
);

export default NewTaskModal;
