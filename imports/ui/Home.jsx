import React from "react";
import { Helmet } from "react-helmet";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const NoTasks = () => <p>You have no tasks.</p>;

const Home = ({ tasks }) => {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Container>
        <Row>
          <Col xs={12} className="mt-3 text-center">
            <span className="h1">Your Tasks</span>{" "}
            <sup>
              (<a href="/all">all tasks</a>)
            </sup>
          </Col>
        </Row>
        <Row>{tasks.length === 0 && <NoTasks />}</Row>
      </Container>
    </>
  );
};

export default Home;
