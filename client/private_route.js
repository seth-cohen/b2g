import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      console.log(rest);
      return rest.loginStatus >= rest.requiredLogin ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      );
    }}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
  location: PropTypes.object,
  loginStatus: PropTypes.number,
  requiredLogin: PropTypes.number
};

PrivateRoute.defaultProps = {
  requiredLogin: 10,
  loginStatus: 0,
  location: null
};

export default PrivateRoute;
