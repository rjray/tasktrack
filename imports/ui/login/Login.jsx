import React from "react";
import { Helmet } from "react-helmet";
import { Redirect } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { Meteor } from "meteor/meteor";

const Login = ({ currentUser }) => {
  return currentUser ? (
    <Redirect to={{ pathname: "/mine" }} />
  ) : (
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
