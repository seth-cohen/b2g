import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { submitLoginForm } from "../actions";
import {
  getLoginNameError,
  getLoginPasswordError,
  getLoginGeneralError
} from "../selectors";
import TextInput from "../../design_components/lb_text_input";

class Login extends React.Component {
  static propTypes = {
    username: PropTypes.string,
    usernameError: PropTypes.string,
    emailAddress: PropTypes.string,
    passwordError: PropTypes.string,
    loginError: PropTypes.string,
    location: PropTypes.object.isRequired,
    submitForm: PropTypes.func.isRequired
  };

  static defaultProps = {
    username: "",
    emailAddress: "",
    usernameError: "",
    passwordError: "",
    loginError: ""
  };

  state = {
    username: this.props.username,
    usernameError: this.props.usernameError,
    password: "",
    passwordError: this.props.passwordError,
    redirect: false
  };

  handleNameChange = e => {
    const username = e.target.value;
    this.setState(() => ({ username }));
  };

  handlePasswordChange = e => {
    const password = e.target.value;
    this.setState(() => ({ password }));
  };

  handleSubmit = e => {
    e.preventDefault();
    const { username, password } = this.state;
    this.props
      .submitForm({ username, password })
      .then(() => {
        this.setState(() => ({ redirect: true }));
      })
      .catch(() => {
        /*noop*/
      });
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/dashboard" } };
    if (this.state.redirect) {
      return <Redirect exact to={from} />;
    }

    return (
      <div>
        <section className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <section className="card">
                <header className="card-header text-center">
                  <span className="h5">Sign in to your Account</span>
                </header>
                {this.props.loginError && (
                  <div
                    className="alert alert-warning mx-4 mt-4 mb-0"
                    role="alert"
                  >
                    {this.props.loginError}
                  </div>
                )}
                <form
                  className="px-4 pt-4"
                  method="POST"
                  action="/login_submit"
                  onSubmit={this.handleSubmit}
                >
                  <TextInput
                    name="username"
                    label="Username/Email:"
                    value={this.state.username}
                    hasError={
                      this.state.usernameError.length > 0 ||
                      this.props.usernameError.length > 0
                    }
                    feedbackMessage={
                      this.state.usernameError || this.props.usernameError
                    }
                    addonFront={
                      <i className="fa fa-envelope fa-fw prefix grey-text" />
                    }
                    onChange={this.handleNameChange}
                  />
                  <TextInput
                    name="password"
                    type={this.state.showPassword ? "text" : "password"}
                    label="Password:"
                    value={this.state.password}
                    hasError={
                      this.state.passwordError.length > 0 ||
                      this.props.passwordError.length > 0
                    }
                    feedbackMessage={
                      this.state.passwordError || this.props.passwordError
                    }
                    addonFront={
                      <i className="fa fa-lock fa-fw prefix grey-text" />
                    }
                    onChange={this.handlePasswordChange}
                  />
                  <div className="text-right">
                    <button type="submit" className="btn btn-primary">
                      Login
                    </button>
                  </div>
                  <hr />
                  <section className="text-right">
                    <p>
                      Not a member? <Link to="/registration">Sign Up</Link>
                    </p>
                    <p>
                      <Link to="/forgot_password">Forgot Password?</Link>
                    </p>
                  </section>
                </form>
              </section>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapDispatchToProps = {
  submitForm: submitLoginForm
};

const mapStateToProps = state => {
  return {
    username:
      state.entities.users.allIDs.indexOf(state.currentUser) !== -1
        ? state.entities.users.byID[state.currentUser].username
        : "",
    usernameError: getLoginNameError(state),
    passwordError: getLoginPasswordError(state),
    loginError: getLoginGeneralError(state)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
