import React from "react";
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

const App = (props) => (
  <Router>
    <Helmet titleTemplate="TaskTrack - %s">
      <title>Home</title>
    </Helmet>
    <Container fluid>
      <Row className="p-3">
        <Col xs={6}>
          <h1>
            <a href="/">
              Task<em>Track</em>
            </a>
          </h1>
        </Col>
        <Col xs={6} className="text-right">
          <AccountsUIWrapper />
        </Col>
      </Row>
    </Container>
    {props.currentUser ? <Routes {...props} /> : <Login />}
  </Router>
);

export default withTracker(() => {
  Meteor.subscribe("tasks");

  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user(),
  };
})(App);
