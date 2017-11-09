import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider, connect } from "react-redux";
import PropTypes from "prop-types";
import { getLoginStatusState } from "../selectors";
import { logoutUser } from "../actions";
import Login from "./login";
import Registration from "./registration";
import Dashboard from "./dashboard";
import PrivateRoute from "../../private_route";
import Header from "../../design_components/lb_header";

const mapStateToProps = state => {
  return {
    loginStatus: getLoginStatusState(state)
  };
};
const ConnectedPrivateRoute = connect(mapStateToProps)(PrivateRoute);

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(logoutUser());
    }
  };
};

const ConnectedHeader = connect(() => ({}), mapDispatchToProps)(Header);

const HomeApp = ({ store }) => (
  <Provider store={store}>
    <Router>
      <div>
        <ConnectedHeader />
        <div className="container">
          <Switch>
          <ConnectedPrivateRoute
            exact
            path="/:dash(dashboard)?"
            component={Dashboard}
            requiredLogin={30}
          />
          <Route path="/login" component={Login} />
          <Route path="/registration" component={Registration} />
          </Switch>
        </div>
      </div>
    </Router>
  </Provider>
);

HomeApp.propTypes = {
  store: PropTypes.object.isRequired
};

export default HomeApp;
