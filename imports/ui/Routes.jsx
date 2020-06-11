import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./Home";
import MyTasks from "./MyTasks/MyTasks";
import AllTasks from "./AllTasks/AllTasks";
import NewTask from "./NewTask/NewTask";

const Routes = (props) => (
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
  </Switch>
);

export default Routes;
