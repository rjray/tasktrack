import React from "react";
import { Helmet } from "react-helmet";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const NoTasks = () => <p>You have no tasks.</p>;

const Home = ({ tasks }) => {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Container>
        <Row>
          <Col xs={4} md={2} className="align-top text-left">
            <Button>New Task</Button>
          </Col>
          <Col xs={4} md={8} className="mt-3 text-center align-top">
            <span className="h1">Your Tasks</span>
            <br />
            <span>
              (<a href="/all">all tasks</a>)
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

export default Home;
