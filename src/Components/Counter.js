import React from 'react';
import PropTypes from 'prop-types';

class Counter extends React.Component {
  render() {
    return (
      <div id={this.props.name}>
        <span className="subtract-time" onClick={() => this.props.adjustTimers(this.props.name, "-")}>-</span>
        <span>Total Time</span>
        <span className="add-time" onClick={() => this.props.adjustTimers(this.props.name, "+")}>+</span>
      </div>
    )
  }
}

Counter.propTypes = {
  name: PropTypes.string.isRequired,
  adjustTimers: PropTypes.func.isRequired
}

export default Counter;
