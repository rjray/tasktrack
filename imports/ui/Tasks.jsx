import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Task = ({ task }) => {
  return <Row></Row>;
};

const Tasks = (tasks) => (
  <Container>
    {tasks.map((task, i) => (
      <Task key={i} task={task} />
    ))}
  </Container>
);

export default Tasks;
