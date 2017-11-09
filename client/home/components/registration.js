import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { submitRegistrationForm, clearErrors } from "../actions";
import TextInput from "../../design_components/lb_text_input";

class Registration extends React.Component {
  static propTypes = {
    username: PropTypes.string,
    usernameError: PropTypes.string, // for server side validation
    password: PropTypes.string,
    passwordError: PropTypes.string, // for server side validation
    email: PropTypes.string,
    emailError: PropTypes.string, // for server side validation
    location: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired,
    submitForm: PropTypes.func.isRequired
  };

  static defaultProps = {
    username: "",
    usernameError: "",
    password: "",
    passwordError: "",
    email: "",
    emailError: "",
  };

  state = {
    username: this.props.username,
    usernameError: "",
    password: this.props.password,
    passwordError: "",
    showPassword: false,
    email: "",
    emailError: "",
    redirect: false
  };

  validate = () => {
    let errors = {};
    const { password, email, username } = this.state;
    if (password.length === 0) {
      errors.password = "Password is required";
    } else if (password.length < 8) {
      errors.password = "Password is too short";
    }

    if (email.length === 0) {
      errors.email = "Email is required";
    }

    if (username.length === 0) {
      errors.username = "Username is required";
    } else if (username.length < 8) {
      errors.username = "Username is too short";
    }

    console.log(errors);
    return errors;
  };

  handleNameChange = e => {
    const username = e.target.value;
    this.setState(() => ({ username }));
  };

  handleEmailChange = e => {
    const email = e.target.value;
    this.setState(() => ({ email }));
  };

  handlePasswordChange = e => {
    const password = e.target.value;
    let passwordError = "";
    if (password.length > 0 && password.length < 8) {
      passwordError = "Password is too short";
    }
    this.setState(() => ({ password, passwordError }));
  };

  clearErrors = () => {
    this.props.clearErrors();
  }

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    if (Object.keys(errors).length === 0) {
      this.clearErrors();
      this.props.submitForm({
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      });
    } else {
      this.setState(() => ({
        passwordError: errors.password || "",
        emailError: errors.email || "",
        usernameError: errors.username || ""
      }));
    }
  };

  handlePassVisibilityClick = () => {
    this.setState(prevState => ({ showPassword: !prevState.showPassword }));
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    if (this.state.redirect) {
      return <Redirect to={from} />;
    }

    const pwIconClasses = cx("fa fa-fw prefix grey-tex", {
      "fa-eye": this.state.showPassword,
      "fa-eye-slash": !this.state.showPassword
    });
    return (
      <div>
        <section className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <section className="card">
                <header className="card-header text-center">
                  <span className="h5">Create Account</span>
                </header>
                <form
                  className="px-4 pt-4"
                  method="POST"
                  action="/users/create"
                  onSubmit={this.handleSubmit}
                  noValidate
                >
                  <TextInput
                    name="username"
                    label="Username:"
                    value={this.state.username}
                    hasError={this.state.usernameError.length > 0 || this.props.usernameError.length > 0}
                    feedbackMessage={this.state.usernameError || this.props.usernameError}
                    addonFront={
                      <i className="fa fa-user fa-fw prefix grey-text" />
                    }
                    onChange={this.handleNameChange}
                  />
                  <TextInput
                    name="email"
                    label="Email:"
                    type="email"
                    value={this.state.email}
                    hasError={this.state.emailError.length > 0 || this.props.emailError.length > 0}
                    feedbackMessage={this.state.emailError || this.props.emailError}
                    addonFront={
                      <i className="fa fa-envelope fa-fw prefix grey-text" />
                    }
                    onChange={this.handleEmailChange}
                  />
                  <TextInput
                    name="password"
                    type={this.state.showPassword ? "text" : "password"}
                    label="Password:"
                    value={this.state.password}
                    helpText="Must be at least 8 characters"
                    hasError={this.state.passwordError.length > 0}
                    feedbackMessage={this.state.passwordError}
                    addonFront={
                      <i className="fa fa-lock fa-fw prefix grey-text" />
                    }
                    addonBack={
                      <i
                        className={pwIconClasses}
                        onClick={this.handlePassVisibilityClick}
                      />
                    }
                    onChange={this.handlePasswordChange}
                  />
                  <div className="text-right">
                    <button type="submit" className="btn btn-primary">
                      Register
                    </button>
                  </div>
                  <hr />
                  <section className="text-right">
                    <p>
                      Already a member? <Link to="/login">Sign in</Link>
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

const mapDispatchToProps = dispatch => {
  return {
    clearErrors: () => (dispatch(clearErrors())),
    submitForm: customData => {
      dispatch(submitRegistrationForm(customData));
    }
  };
};

const mapStateToProps = state => {
  return state.login;
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
