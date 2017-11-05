import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
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
    showPassword: false,
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

  handlePassVisibilityClick = () => {
    this.setState((prevState) => ({showPassword: !prevState.showPassword}));
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    if (this.state.redirect) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        <header
          className="jumbotron"
          style={{
            backgroundColor: "#A9F16C"
          }}
        >
          <div className="container">
            <div className="row">
              <h1>{this.props.userName}</h1>
              <p />
            </div>
          </div>
        </header>

        <form method="POST" action="/login-submit" onSubmit={this.handleSubmit}>
          <p className="h5 text-center mb-4">Sign in to your Account</p>
          <TextInput
            name="username"
            label="Username/Email:"
            value={this.state.userName}
            addonFront={<i className="fa fa-envelope fa-fw prefix grey-text" />}
            onChange={this.handleNameChange}
          />
          <TextInput
            name="password"
            type={this.state.showPassword ? 'text' : 'password'}
            label="Password:"
            value={this.state.password}
            addonFront={<i className="fa fa-lock fa-fw prefix grey-text" />}
            addonBack={<i className="fa fa-eye fa-fw prefix grey-text" onClick={this.handlePassVisibilityClick} />}
            onChange={this.handlePasswordChange}
          />
          <div className="text-center">
            <button className="btn btn-default">Login</button>
          </div>
          <button className="btn btn-default" onClick={this.handleUpdateClick}>
            Update Name
          </button>
          <input className="btn btn-default" type="submit" value="Say hello!" />
        </form>
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
