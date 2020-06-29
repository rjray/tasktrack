import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const DeleteTaskModal = ({ show, setShow, submitHandler, task }) => (
  <Modal show={show} onHide={() => setShow(false)}>
    <Modal.Header closeButton>
      <Modal.Title>Update Task</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>
        You are about to delete the task, "<b>{task.name}</b>".
      </p>
      <p>Are you sure?</p>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={submitHandler}>Delete</Button>
    </Modal.Footer>
  </Modal>
);

export default DeleteTaskModal;
