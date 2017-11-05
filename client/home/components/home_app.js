import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
import Login from "./login";
import Dashboard from "./dashboard";
import PrivateRoute from "../../private_route";

const HomeApp = ({ store }) => (
  <Provider store={store}>
    <Router>
      <div className="container">
        <header>Navigation and things</header>
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <Route path="/login" component={Login} />
      </div>
    </Router>
  </Provider>
);

HomeApp.propTypes = {
  store: PropTypes.object.isRequired
};

export default HomeApp;
