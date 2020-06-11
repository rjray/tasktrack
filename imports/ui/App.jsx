import React from "react";
import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user(),
  };
})(App);
