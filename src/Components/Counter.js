import React from 'react';
import PropTypes from 'prop-types';
import { keyboardHandler } from '../helpers';
import '../style/Counter.css';

const Counter = ({ adjustTimers, name, timerTotal }) => {
  let timerName;
  if (name === 'sessionTime') {
    timerName = 'Session Length';
  }
  if (name === 'breakTime') {
    timerName = 'Break Length';
  }

  return (
    <div id={`${name}-timer-controls`} className="timer-controls">
      <p className="timer-control-name">{timerName}</p>
      <div className="counter-controls">
        <div
          className="adjust-time"
          onClick={() => adjustTimers(name, '-')}
          onKeyPress={e => {
            if (keyboardHandler(e)) adjustTimers(name, '-');
          }}
          role="button"
          tabIndex={0}
        >
          -
        </div>
        <div className="timerTotal">{timerTotal}</div>
        <div
          className="adjust-time"
          onClick={() => adjustTimers(name, '+')}
          onKeyPress={e => {
            if (keyboardHandler(e)) adjustTimers(name, '+');
          }}
          role="button"
          tabIndex={0}
        >
          +
        </div>
      </div>
    </div>
  );
};

Counter.propTypes = {
  name: PropTypes.string.isRequired,
  adjustTimers: PropTypes.func.isRequired,
  timerTotal: PropTypes.number.isRequired
};

export default Counter;
