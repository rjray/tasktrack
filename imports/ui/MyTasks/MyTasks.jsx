import React from "react";
import { Helmet } from "react-helmet";
import { Redirect } from "react-router-dom";
import Container from "react-bootstrap/Container";

const MyTasks = ({ tasks, currentUser }) => {
  return !currentUser ? (
    <Redirect to={{ pathname: "/login" }} />
  ) : (
    <>
      <Helmet>
        <title>My Tasks</title>
      </Helmet>
      <Container fluid>
        <h1 className="mt-3">Your Tasks</h1>
      </Container>
    </>
  );
};

export default MyTasks;
