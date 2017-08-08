import React from 'react';
import PropTypes from 'prop-types';

class Counter extends React.Component {
  render() {
    var timerName;
    if (this.props.name === "sessionTime") {timerName = "Session Length"};
    if (this.props.name === "breakTime") {timerName = "Break Length"};

    return (
      <div id={this.props.name} className="timer-controls">
        <p>{timerName}</p>
        <span className="subtract-time" onClick={() => this.props.adjustTimers(this.props.name, "-")}>-</span>
        <span>{this.props.timerTotal}</span>
        <span className="add-time" onClick={() => this.props.adjustTimers(this.props.name, "+")}>+</span>
      </div>
    )
  }
}

Counter.propTypes = {
  name: PropTypes.string.isRequired,
  adjustTimers: PropTypes.func.isRequired,
  timerTotal: PropTypes.number.isRequired
}

export default Counter;
