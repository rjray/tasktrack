import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import NewTaskModal from "./NewTaskModal";

const NoTasks = () => <p>You have no tasks.</p>;

const Home = ({ tasks }) => {
  const [showCompleted, setShowCompleted] = useState(false);
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Container>
        <Row>
          <Col xs={4} md={2} className="align-top text-left">
            <Button onClick={() => setShowForm(true)}>New Task</Button>
          </Col>
          <Col xs={4} md={8} className="mt-3 text-center align-top">
            <span className="h1">Your Tasks</span>
            <br />(<Link to={{ pathname: "/all" }}>all tasks</Link>)
          </Col>
          <Col xs={4} md={2} className="align-top text-right">
            <span>Show Completed: </span>
            <Form.Check
              id="showCompleted"
              inline
              custom
              type="switch"
              className="mr-0 pr-0 align-middle"
              label=""
              checked={showCompleted}
              onChange={() => setShowCompleted(!showCompleted)}
            />
          </Col>
        </Row>
        <Row>{tasks.length === 0 && <NoTasks />}</Row>
      </Container>
      <NewTaskModal show={showForm} setShow={setShowForm} />
    </>
  );
};

export default Home;
