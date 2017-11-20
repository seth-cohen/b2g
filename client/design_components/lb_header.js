import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./styles/lb_header.scss";

class Header extends React.Component {
  static propTypes = {
    username: PropTypes.string,
    loginStatus: PropTypes.number,
    logout: PropTypes.func.isRequired
  };

  static defaultProps = {
    username: "Guest",
    loginStatus: 0
  };

  render() {
    return (
      <nav className="Navbar">
        <ul className="row Navbar-menu u-textCenter">
          <li className="u-flexLeft Navbar-branding">
            <Link to="/">
              <img src="/public/img/logo_xs.png" />
            </Link>
          </li>
          <li className="Navbar-menu-item u-flexLeft">
            <Link to="/">
              <i className="fa fa-lg fa-home" />Dashboard
            </Link>
          </li>
          <li className="Navbar-menu-item u-flexLeft">
            <Link to="/games">
              <i className="fa fa-lg fa-gamepad" />Games
            </Link>
          </li>
          <li className="Navbar-menu-item u-flexLeft">
            <Link to="/games">
              <i className="fa fa-lg fa-tv" />Platforms
            </Link>
          </li>
          <li className="Navbar-menu-item u-flexLeft">
            <Link to="/people">
              <i className="fa fa-lg fa-fw fa-users" />People
            </Link>
          </li>
          <li className="Navbar-menu-item u-flexLeft">
            <Link to="/gamesession">
              <i className="fa fa-lg fa-play-circle" />Game Sessions
            </Link>
          </li>
          <li className="u-flexRight">
            <section className="ml-auto mr-4">
              <div className="">{`Hello ${this.props.loginStatus > 0
                ? this.props.username
                : "Guest"}`}</div>
              {this.props.loginStatus > 0 && (
                <button onClick={this.props.logout}>Logout</button>
              )}
            </section>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Header;
