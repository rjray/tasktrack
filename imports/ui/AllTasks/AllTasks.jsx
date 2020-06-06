import React from "react";
import { Helmet } from "react-helmet";
import { Redirect } from "react-router-dom";
import Container from "react-bootstrap/Container";

const AllTasks = ({ tasks, currentUser }) => {
  return !currentUser ? (
    <Redirect to={{ pathname: "/login" }} />
  ) : (
    <>
      <Helmet>
        <title>All Tasks</title>
      </Helmet>
      <Container fluid>
        <h1 className="mt-3">All Tasks</h1>
      </Container>
    </>
  );
};

export default AllTasks;
