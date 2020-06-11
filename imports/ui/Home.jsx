import React from "react";
import { Helmet } from "react-helmet";
import Container from "react-bootstrap/Container";

const Home = ({ currentUser }) => {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Container fluid>
        <h1 className="mt-3">Home</h1>
      </Container>
    </>
  );
};

export default Home;
