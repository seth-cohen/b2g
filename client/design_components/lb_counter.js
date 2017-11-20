import React from "react";
import PropTypes from "prop-types";
import "./styles/lb_counter.scss"

class Counter extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    count: PropTypes.number.isRequired
  };

  static defaulProps = {
    label: ""
  };

  render() {
    return (
        <div className="Counter bg-light" >
          {this.props.label && <p className="Counter-title text-center ft-md mb-0">{this.props.label}</p>}
          <p className="Counter-value text-center ft-xxl">{this.props.count}</p>
        </div>
    );
  }
}

export default Counter;
