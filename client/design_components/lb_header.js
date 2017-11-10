import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

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
      <nav className="navbar navbar-expand-lg navbar-light bg-secondary mb-4">
        <div className="container">
          <Link to="/">
            <img src="/public/img/logo_xs.png" />
          </Link>
          <section className="ml-auto mr-4">
            <div className="">{`Hello ${this.props.loginStatus > 0 ? this.props.username : "Guest"}`}</div>
            {this.props.loginStatus > 0 && <button onClick={this.props.logout}>Logout</button>}
          </section>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarToggler"
            aria-controls="navbarToggler"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <section className="collapse navbar-collapse" id="navbarToggler">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item active">
                <a className="nav-link" href="#">
                  Home <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Link
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="#">
                  Disabled
                </a>
              </li>
            </ul>
          </section>
        </div>
      </nav>
    );
  }
}

export default Header;
