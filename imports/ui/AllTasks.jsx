import React from "react";
import { Helmet } from "react-helmet";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const NoTasks = () => <p>There are currently no tasks.</p>;

const AllTasks = ({ tasks, currentUser }) => {
  return (
    <>
      <Helmet>
        <title>All Tasks</title>
      </Helmet>
      <Container>
        <Row>
          <Col xs={4} md={2} className="align-top text-left">
            <Button>New Task</Button>
          </Col>
          <Col xs={4} md={10} className="mt-3 text-center">
            <span className="h1">All Tasks</span>
            <br />
            <span>
              (<a href="/">your tasks</a>)
            </span>
          </Col>
          <Col xs={4} md={2} className="align-top text-right">
            <Button>Show Finished</Button>
          </Col>
        </Row>
        <Row>{tasks.length === 0 && <NoTasks />}</Row>
      </Container>
    </>
  );
};

export default AllTasks;
