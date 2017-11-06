import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
import Login from "./login";
import Registration from "./registration";
import Dashboard from "./dashboard";
import PrivateRoute from "../../private_route";
import Header from "../../design_components/lb_header";

const HomeApp = ({ store }) => (
  <Provider store={store}>
    <div>
      <Header />
      <Router>
        <div className="container">
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <Route path="/login" component={Login} />
          <Route path="/registration" component={Registration} />
        </div>
      </Router>
    </div>
  </Provider>
);

HomeApp.propTypes = {
  store: PropTypes.object.isRequired
};

export default HomeApp;
