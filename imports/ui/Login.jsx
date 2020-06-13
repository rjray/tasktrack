import React from "react";
import { Helmet } from "react-helmet";
import Container from "react-bootstrap/Container";

const Login = () => {
  return (
    <>
      <Helmet>
        <title>Log In</title>
      </Helmet>
      <Container>
        <h1 className="text-center mt-3">
          Welcome to Task<em>Track</em>
        </h1>
        <p className="text-center mt-5">
          You need to log in or create an account to use this tool.
        </p>
      </Container>
    </>
  );
};

export default Login;
