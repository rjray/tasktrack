import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./Home";
import AllTasks from "./AllTasks";

const Routes = (props) => (
  <Switch>
    <Route exact path="/">
      <Home {...props} />
    </Route>
    <Route path="/all">
      <AllTasks {...props} />
    </Route>
  </Switch>
);

export default Routes;
