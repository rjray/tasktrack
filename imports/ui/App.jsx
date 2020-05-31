import React from "react";
import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";

import Tasks from "../api/tasks";
import AccountsUIWrapper from "./AccountsUIWrapper";
import Login from "./login/Login";

const App = (props) => (
  <Router>
    <Helmet titleTemplate="TaskTrack - %s">
      <title>Home</title>
    </Helmet>
    <Container fluid>
      <Navbar bg="light" expand="sm">
        <LinkContainer to="/">
          <Navbar.Brand>
            Task<em>Track</em>
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title="View" id="basic-nav-dropdown">
              <LinkContainer to="/">
                <NavDropdown.Item>My Tasks</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/all">
                <NavDropdown.Item>All Tasks</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/new">
                <NavDropdown.Item>New Task</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
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
        <Route path="/all">
          <Container></Container>
        </Route>
        <Route path="/new">
          <Container></Container>
        </Route>
        <Route path="/login">
          <Login />
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
