import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { submitLoginForm, setLoginErrors } from "../actions";
import {
  getLoginNameError,
  getLoginPasswordError,
  getLoginGeneralError,
  getCurrentUsername
} from "../selectors";
import TextInput from "../../design_components/lb_text_input";

const noop = () => {};

class Login extends React.Component {
  static propTypes = {
    username: PropTypes.string,
    usernameError: PropTypes.string,
    emailAddress: PropTypes.string,
    passwordError: PropTypes.string,
    loginError: PropTypes.string,
    setErrors: PropTypes.func,
    location: PropTypes.object.isRequired,
    submitForm: PropTypes.func.isRequired
  };

  static defaultProps = {
    username: "",
    emailAddress: "",
    usernameError: "",
    passwordError: "",
    loginError: "",
    setErrors: noop
  };

  state = {
    username: this.props.username,
    password: "",
    redirect: false
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.username != this.props.username) {
      this.setState(() => ({ username: nextProps.username }));
    }
  }

  validate = () => {
    return this.validateUsername() | this.validatePassword();
  };

  validatePassword = () => {
    if (this.state.password.length === 0) {
      this.props.setErrors({passwordError: "Password is required"});
      
      return false;
    }
    this.props.setErrors({passwordError: ""});
    
    return true;
  }

  validateUsername = () => {
    if (this.state.username.length === 0) {
      this.props.setErrors({usernameError: "Username is required"});
      
      return false;
    }
    this.props.setErrors({usernameError: ""});

    return true;
  }

  clearErrors = () => {
    this.props.setErrors({});
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
    if (this.validate()) {
      const { username, password } = this.state;
      this.props
        .submitForm({ username, password })
        .then(() => {
          this.setState(() => ({ redirect: true }));
        })
        .catch(() => {
          /*noop*/
        });
    }
  };

  render() {
    const { from } = this.props.location.state || {
      from: { pathname: "/dashboard" }
    };
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
                    hasError={this.props.usernameError.length > 0}
                    feedbackMessage={this.props.usernameError}
                    addonFront={
                      <i className="fa fa-envelope fa-fw prefix grey-text" />
                    }
                    onChange={this.handleNameChange}
                    onBlur={this.validateUsername}
                  />
                  <TextInput
                    name="password"
                    type={this.state.showPassword ? "text" : "password"}
                    label="Password:"
                    value={this.state.password}
                    hasError={this.props.passwordError.length > 0}
                    feedbackMessage={this.props.passwordError}
                    addonFront={
                      <i className="fa fa-lock fa-fw prefix grey-text" />
                    }
                    onChange={this.handlePasswordChange}
                    onBlur={this.validatePassword}
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
  submitForm: submitLoginForm,
  setErrors: setLoginErrors
};

const mapStateToProps = state => {
  return {
    username: getCurrentUsername(state),
    usernameError: getLoginNameError(state),
    passwordError: getLoginPasswordError(state),
    loginError: getLoginGeneralError(state)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
