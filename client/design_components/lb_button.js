import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import "./styles/lb_button.scss";

const noop = () => {};

class Button extends React.Component {
  static propTypes = {
    isFullWidth: PropTypes.bool,
    variation: PropTypes.oneOf(["primary", "secondary", "ghost"]),
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]),
    onClick: PropTypes.func
  };

  static defaultProps = {
    isFullWidth: false,
    variation: "primary",
    children: null,
    onClick: noop
  };

  handleClick = e => {
    e.preventDefault();
    this.props.onClick();
  };

  render() {
    const classes = cx("Button", {
      "Button--primary": this.props.variation === "primary",
      "Button--secondary": this.props.variation === "secondary",
      "Button--ghost": this.props.variation === "ghost",
      "Button--fullWidth": this.props.isFullWidth
    });

    return (
      <button type="submit" className={classes}>
        {this.props.children && this.props.children}
      </button>
    );
  }
}

export default Button;
