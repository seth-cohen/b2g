import React from "react";
import PropTypes from "prop-types";

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
    extraClasses: [],
    addonFront: null,
    addonBack: null
  };

  render() {
    const hasAddons = this.props.addonFront || this.props.addonBack;
    return (
      <div className="form-group">
        <label htmlFor={this.props.name}>{this.props.label}</label>
        {hasAddons ? (
          <div className="input-group">
            {this.props.addonFront && <span className="input-group-addon">{this.props.addonFront}</span>}
            <input
              className="form-control"
              type={this.props.type}
              id={this.props.id}
              name={this.props.name}
              value={this.props.value}
              onChange={this.props.onChange}
              disabled={this.props.disabled}
              placeholder={this.props.placeholder}
            />
            {this.props.addonBack && <span className="input-group-addon">{this.props.addonBack}</span>}
          </div>
        ) : (
          <input
            className="form-control"
            type={this.props.type}
            id={this.props.id}
            name={this.props.name}
            value={this.props.value}
            onChange={this.props.onChange}
            disabled={this.props.disabled}
            placeholder={this.props.placeholder}
          />
        )}
      </div>
    );
  }
}

export default TextInput;
