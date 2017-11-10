import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import {
  submitRegistrationForm,
  setRegistrationErrors,
  checkUsername
} from "../actions";
import {
  getRegistrationNameError,
  getRegistrationPasswordError,
  getRegistrationEmailError,
  getRegistrationGeneralError,
  getCurrentUsername
} from "../selectors";
import {
  IsValidUsername,
  IsValidEmail,
  PasswordStrength,
  PASSWORD_WEAK,
  PASSWORD_MEDIUM,
  PASSWORD_STRONG,
  MIN_PASSWORD,
  MAX_PASSWORD,
  MIN_USERNAME
} from "../../utils/validation";
import TextInput from "../../design_components/lb_text_input";
import ProgressBar from "../../design_components/lb_progress_bar";

const noop = () => {};
class Registration extends React.Component {
  static propTypes = {
    username: PropTypes.string,
    usernameError: PropTypes.string,
    usernameTaken: PropTypes.string,
    password: PropTypes.string,
    passwordError: PropTypes.string,
    email: PropTypes.string,
    emailError: PropTypes.string,
    registrationError: PropTypes.string,
    setErrors: PropTypes.func,
    checkUsername: PropTypes.func,
    location: PropTypes.object.isRequired,
    submitForm: PropTypes.func.isRequired
  };

  static defaultProps = {
    username: "",
    usernameError: "",
    usernameTaken: "",
    password: "",
    passwordError: "",
    email: "",
    emailError: "",
    registrationError: "",
    setErrors: noop,
    checkUsername: noop
  };

  state = {
    username: this.props.username,
    password: this.props.password,
    pwStrength: 0,
    pwStrengthText: "",
    showPassword: false,
    email: "",
    redirect: false
  };

  validate = () => {
    let hasError =
      !this.validateUsername() |
      !this.validatePassword() |
      !this.validateEmail();
    return !hasError;
  };

  validatePassword = () => {
    const { password } = this.state;
    let passwordError = "";
    let pwStrengthText = "";

    const pwStrength = PasswordStrength(password);
    switch (pwStrength) {
      case PASSWORD_WEAK:
        pwStrengthText = "Weak";
        break;
      case PASSWORD_MEDIUM:
        pwStrengthText = "Medium";
        break;
      case PASSWORD_STRONG:
        pwStrengthText = "Strong";
        break;
      default:
        pwStrengthText = "";
    }

    if (password.length === 0) {
      passwordError = "Password is required";
    } else if (password.length > 0 && password.length < MIN_PASSWORD) {
      passwordError = "Password is too short";
    } else if (password.length > MAX_PASSWORD) {
      passwordError = "Password is too long";
    }

    this.setState(() => ({
      pwStrength,
      pwStrengthText
    }));

    this.props.setErrors({ passwordError });
    return passwordError.length === 0;
  };

  validateUsername = () => {
    const { username } = this.state;
    let usernameError = "";

    if (username.length === 0) {
      usernameError = "Username is required";
    } else if (username.length > 0 && username.length < MIN_USERNAME) {
      usernameError = "Username is too short";
    } else if (!IsValidUsername(username)) {
      usernameError = "Invalid username";
    }

    this.props.setErrors({ usernameError });
    return usernameError.length === 0;
  };

  validateEmail = () => {
    const { email } = this.state;
    let emailError = "";

    if (email.length === 0) {
      emailError = "Email is required";
    } else if (!IsValidEmail(email)) {
      emailError = "Invalid email";
    }

    this.props.setErrors({ emailError });
    return emailError.length === 0;
  };

  handleNameChange = e => {
    const username = e.target.value;
    this.setState(() => ({ username }), this.validateUsername);
  };

  handleNameBlur = () => {
    const { username } = this.state;
    if (IsValidUsername(username)) {
      this.props.checkUsername(this.state.username);
    }
  };

  handleEmailChange = e => {
    const email = e.target.value;
    this.setState(() => ({ email }), this.validateEmail);
  };

  handlePasswordChange = e => {
    const password = e.target.value;
    this.setState(() => ({ password }), this.validatePassword);
  };

  clearErrors = () => {
    this.props.setErrors({});
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.validate()) {
      this.props
        .submitForm({
          username: this.state.username,
          email: this.state.email,
          password: this.state.password
        })
        .then(() => {
          this.setState(() => ({ redirect: true }));
        })
        .catch(() => {
          /*noop*/
        });
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
                {this.props.registrationError && (
                  <div
                    className="alert alert-warning mx-4 mt-4 mb-0"
                    role="alert"
                  >
                    {this.props.registrationError}
                  </div>
                )}
                <form
                  className="px-4 pt-4"
                  method="POST"
                  action="/users/create"
                  onSubmit={this.handleSubmit}
                  noValidate
                >
                  {this.props.usernameTaken.length > 0 && (
                    <div>{this.props.usernameTaken}</div>
                  )}
                  <TextInput
                    name="username"
                    label="Username:"
                    value={this.state.username}
                    helpText={`Must be at least ${MIN_USERNAME} characters and contain only alphanumeric characters, '_' or '-'`}
                    hasError={this.props.usernameError.length > 0}
                    feedbackMessage={this.props.usernameError}
                    addonFront={
                      <i className="fa fa-user fa-fw prefix grey-text" />
                    }
                    onChange={this.handleNameChange}
                    onBlur={this.handleNameBlur}
                  />
                  <TextInput
                    name="email"
                    label="Email:"
                    type="email"
                    value={this.state.email}
                    hasError={this.props.emailError.length > 0}
                    feedbackMessage={this.props.emailError}
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
                    helpText={`Must be at least ${MIN_PASSWORD} characters`}
                    hasError={this.props.passwordError.length > 0}
                    feedbackMessage={this.props.passwordError}
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
                  <ProgressBar
                    isColored
                    value={this.state.pwStrength}
                    text={this.state.pwStrengthText}
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

const mapDispatchToProps = {
  submitForm: submitRegistrationForm,
  setErrors: setRegistrationErrors,
  checkUsername
};

const mapStateToProps = state => {
  return {
    username: getCurrentUsername(state),
    usernameError: getRegistrationNameError(state),
    passwordError: getRegistrationPasswordError(state),
    emailError: getRegistrationEmailError(state),
    registrationError: getRegistrationGeneralError(state)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
