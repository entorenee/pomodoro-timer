import React from 'react';
import PropTypes from 'prop-types';
import '../style/Counter.css';

class Counter extends React.Component {
  render() {
    var timerName;
    if (this.props.name === "sessionTime") {timerName = "Session Length"};
    if (this.props.name === "breakTime") {timerName = "Break Length"};

    return (
      <div id={this.props.name + "-timer-controls"} className="timer-controls">
        <p>{timerName}</p>
        <div className="controls">
          <div className="subtract-time" onClick={() => this.props.adjustTimers(this.props.name, "-")}>-</div>
          <div className="timerTotal">{this.props.timerTotal}</div>
          <div className="add-time" onClick={() => this.props.adjustTimers(this.props.name, "+")}>+</div>
        </div>
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
