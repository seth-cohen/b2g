import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

const ProgressBar = props => {
  const { isColored, value } = props;

  const progressBarClasses = cx("progress-bar", {
    "bg-success": isColored && value >= 100,
    "bg-warning": isColored && value >= 66 && value < 100,
    "bg-danger": isColored && value >= 0 && value < 66
  });

  return (
    <div className="progress mb-2">
      <div
        className={progressBarClasses}
        role="progressbar"
        style={{ width: `${value}%` }}
        aria-valuenow={value}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        {props.text && props.text}
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  value: PropTypes.number.isRequired,
  isColored: PropTypes.bool,
  text: PropTypes.string
};

ProgressBar.defaultProps = {
  isColored: false,
  text: ""
};

export default ProgressBar;
