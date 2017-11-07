import React from "react";
import PropTypes from "prop-types";

class Header extends React.Component {
  static propTypes = {
    userName: PropTypes.string
  };

  static defaultProps = {
    userName: "Guest"
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-secondary mb-4">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img src="/public/img/logo_xs.png" />
          </a>
          <section className="ml-auto mr-4">
            <div className="">{`Hello ${this.props.userName}`}</div>
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
