import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

const noop = () => {};

class TextInput extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["text", "password", "number", "email", "tel"]),
    id: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    extraClasses: PropTypes.arrayOf(PropTypes.string),
    helpText: PropTypes.string,
    feedbackMessage: PropTypes.string,
    wasValidated: PropTypes.bool,
    hasError: PropTypes.bool,
    showLabel: PropTypes.bool,
    addonFront: PropTypes.node,
    addonBack: PropTypes.node,
    onChange: PropTypes.func
  };

  static defaultProps = {
    onChange: noop,
    type: "text",
    disabled: false,
    id: "",
    placeholder: "",
    showLabel: true,
    helpText: "",
    feedbackMessage: "",
    wasValidated: false,
    hasError: false,
    extraClasses: [],
    addonFront: null,
    addonBack: null
  };

  render() {
    const inputClasses = cx("form-control", {
      "is-valid": this.props.wasValidated && !this.props.hasError,
      "is-invalid": this.props.hasError
    });
    return (
      <div className="form-group">
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <div className="input-group">
          {this.props.addonFront && (
            <span className="input-group-addon">{this.props.addonFront}</span>
          )}
          <input
            className={inputClasses}
            type={this.props.type}
            id={this.props.id}
            name={this.props.name}
            value={this.props.value}
            onChange={this.props.onChange}
            disabled={this.props.disabled}
            placeholder={this.props.placeholder}
          />
          {this.props.addonBack && (
            <span className="input-group-addon">{this.props.addonBack}</span>
          )}
        </div>
        {this.props.feedbackMessage && (
          <div className="invalid-feedback">{this.props.feedbackMessage}</div>
        )}
        {this.props.helpText && (
          <small className="form-text text-muted">{this.props.helpText}</small>
        )}
      </div>
    );
  }
}

export default TextInput;
