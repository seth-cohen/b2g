import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { updateName, submitLoginForm } from "../actions";
import TextInput from "../../design_components/lb_text_input";

class Login extends React.Component {
  static propTypes = {
    userName: PropTypes.string,
    password: PropTypes.string,
    location: PropTypes.object.isRequired,
    updateName: PropTypes.func.isRequired,
    submitForm: PropTypes.func.isRequired
  };

  static defaultProps = {
    userName: "",
    password: ""
  };

  state = {
    userName: this.props.userName,
    password: this.props.password,
    redirect: false
  };

  handleNameChange = e => {
    const userName = e.target.value;
    this.setState(() => ({ userName }));
  };

  handlePasswordChange = e => {
    const password = e.target.value;
    this.setState(() => ({ password }));
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.submitForm(this.state.userName);
  };

  handleUpdateClick = () => {
    this.props.updateName(this.state.userName);
    this.setState(() => ({ redirect: true }));
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    if (this.state.redirect) {
      return <Redirect to={from} />;
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
                <form
                  className="px-4 pt-4"
                  method="POST"
                  action="/login_submit"
                  onSubmit={this.handleSubmit}
                >
                  <TextInput
                    name="username"
                    label="Username/Email:"
                    value={this.state.userName}
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
                    addonFront={
                      <i className="fa fa-lock fa-fw prefix grey-text" />
                    }
                    onChange={this.handlePasswordChange}
                  />
                  <div className="text-right">
                    <button type="submit" className="btn btn-primary">Login</button>
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

const mapDispatchToProps = dispatch => {
  return {
    updateName: userName => {
      dispatch(updateName(userName));
    },
    submitForm: customData => {
      dispatch(submitLoginForm(customData));
    }
  };
};

const mapStateToProps = state => {
  return state.login;
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
