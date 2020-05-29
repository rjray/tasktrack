import React from "react";
import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";

import Tasks from "../api/tasks";
import AccountsUIWrapper from "./AccountsUIWrapper";

const App = (props) => (
  <Router>
    <Helmet titleTemplate="TaskTrack - %s">
      <title>Home</title>
    </Helmet>
    <Container fluid>
      <Navbar bg="light" expand="sm">
        <LinkContainer to="/">
          <Navbar.Brand>TaskTrack</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
        <Nav>
          <AccountsUIWrapper />
        </Nav>
      </Navbar>
    </Container>
    <Container fluid>
      <Switch>
        <Route exact path="/">
          <Container></Container>
        </Route>
      </Switch>
    </Container>
  </Router>
);

export default withTracker(() => {
  Meteor.subscribe("tasks");

  return {
    tasks: Tasks.find({}).fetch(),
    currentUser: Meteor.user(),
  };
})(App);
