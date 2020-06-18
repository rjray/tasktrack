import React from "react";
import Modal from "react-bootstrap/Modal";

import TaskForm from "./TaskForm";

const NewTaskModal = ({ show, setShow }) => (
  <Modal show={show} onHide={() => setShow(false)}>
    <Modal.Header closeButton>
      <Modal.Title>Create New Task</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <TaskForm type="modal" />
    </Modal.Body>
  </Modal>
);

export default NewTaskModal;
