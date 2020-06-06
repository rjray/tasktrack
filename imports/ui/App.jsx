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
import Home from "./Home";
import Login from "./login/Login";
import MyTasks from "./MyTasks/MyTasks";
import AllTasks from "./AllTasks/AllTasks";
import NewTask from "./NewTask/NewTask";

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
              <LinkContainer to="/mine">
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
          <Home {...props} />
        </Route>
        <Route path="/mine">
          <MyTasks {...props} />
        </Route>
        <Route path="/all">
          <AllTasks {...props} />
        </Route>
        <Route path="/new">
          <NewTask {...props} />
        </Route>
        <Route path="/login">
          <Login {...props} />
        </Route>
      </Switch>
    </Container>
  </Router>
);

export default withTracker(() => {
  Meteor.subscribe("tasks");

  return {
    tasks: Tasks,
    currentUser: Meteor.user(),
  };
})(App);
