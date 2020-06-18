import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";

import "../imports/startup/accounts-config.js";
import App from "../imports/ui/App.jsx";

import "bootstrap/dist/css/bootstrap-reboot.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

import "../imports/ui/styles.css";

Meteor.startup(() => {
  render(<App />, document.getElementById("react-target"));
});
