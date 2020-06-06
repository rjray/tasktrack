import React from "react";
import { Redirect } from "react-router-dom";

const Home = ({ currentUser }) => {
  return !currentUser ? (
    <Redirect to={{ pathname: "/login" }} />
  ) : (
    <Redirect to={{ pathname: "/mine" }} />
  );
};

export default Home;
