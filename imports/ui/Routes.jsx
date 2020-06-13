import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./Home";
import AllTasks from "./AllTasks";
import NewTask from "./NewTask";

const Routes = (props) => (
  <Switch>
    <Route exact path="/">
      <Home {...props} />
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
