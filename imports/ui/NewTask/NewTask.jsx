import React from "react";
import { Helmet } from "react-helmet";
import { Redirect } from "react-router-dom";
import Container from "react-bootstrap/Container";

const NewTask = ({ tasks, currentUser }) => {
  return !currentUser ? (
    <Redirect to={{ pathname: "/login" }} />
  ) : (
    <>
      <Helmet>
        <title>New Task</title>
      </Helmet>
      <Container fluid>
        <h1 className="mt-3">Create New Task</h1>
      </Container>
    </>
  );
};

export default NewTask;
