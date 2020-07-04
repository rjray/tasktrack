import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Meteor } from "meteor/meteor";

import NewTaskModal from "./NewTaskModal";
import TaskTable from "./TaskTable";
import { taskStatusMap, createTaskTree } from "../api/tasks";

const Home = ({ tasks, currentUser, showCompleted, setShowCompleted }) => {
  const [showForm, setShowForm] = useState(false);

  const mainTasks = createTaskTree(tasks);
  const allTasks = showCompleted
    ? mainTasks
    : mainTasks.filter((i) => i.status !== taskStatusMap.COMPLETED);
  const userTasks = allTasks.filter((i) => i.owner === currentUser._id);

  const submitHandler = (values, formikBag) => {
    Meteor.call("tasks.create", values);
    formikBag.setSubmitting(false);
    setShowForm(false);
  };

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
        <Row>
          <TaskTable
            tasks={userTasks}
            currentUser={currentUser}
            showCompleted={showCompleted}
          />
        </Row>
      </Container>
      <NewTaskModal
        currentUser={currentUser}
        show={showForm}
        setShow={setShowForm}
        submitHandler={submitHandler}
      />
    </>
  );
};

export default Home;
