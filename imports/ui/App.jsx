import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { BrowserRouter as Router } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";

import Tasks from "../api/tasks";
import AccountsUIWrapper from "./AccountsUIWrapper";
import Routes from "./Routes";
import Login from "./Login";

const createUserTable = (users) => {
  const table = {};

  for (const user of users) {
    table[user._id] = user.username;
  }

  return table;
};

const App = ({ tasks, allUsers, currentUser }) => {
  const [showCompleted, setShowCompleted] = useState(false);
  const toggle = { showCompleted, setShowCompleted };
  const props = {
    tasks,
    currentUser,
    allUsers: createUserTable(allUsers),
  };

  return (
    <Router>
      <Helmet titleTemplate="TaskTrack - %s">
        <title>Home</title>
      </Helmet>
      <Container fluid>
        <Row className="p-3">
          <Col xs={6}>
            <h1>
              Task<em>Track</em>
            </h1>
          </Col>
          <Col xs={6} className="text-right">
            <AccountsUIWrapper />
          </Col>
        </Row>
      </Container>
      {props.currentUser ? <Routes {...props} {...toggle} /> : <Login />}
    </Router>
  );
};

export default withTracker(() => {
  Meteor.subscribe("tasks");
  Meteor.subscribe("userList");

  return {
    tasks: Tasks.find({}).fetch(),
    allUsers: Meteor.users.find({}).fetch(),
    currentUser: Meteor.user(),
  };
})(App);
