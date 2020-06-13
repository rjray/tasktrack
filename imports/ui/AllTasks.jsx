import React from "react";
import { Helmet } from "react-helmet";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const NoTasks = () => <p>There are currently no tasks.</p>;

const AllTasks = ({ tasks, currentUser }) => {
  return (
    <>
      <Helmet>
        <title>All Tasks</title>
      </Helmet>
      <Container>
        <Row>
          <Col xs={12} className="mt-3 text-center">
            <span className="h1">All Tasks</span>{" "}
            <sup>
              (<a href="/">your tasks</a>)
            </sup>
          </Col>
        </Row>
        <Row>{tasks.length === 0 && <NoTasks />}</Row>
      </Container>
    </>
  );
};

export default AllTasks;
