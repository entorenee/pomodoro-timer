import React from 'react';
import PropTypes from 'prop-types';
import '../style/Timer.css';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.countdownTimer = this.countdownTimer.bind(this);

    this.state = {
      // countdown timers are stored in state in ms as they are directly manipulated by the timer method.
      sessionCountdown: props.sessionTime * 60000,
      breakCountdown: props.breakTime * 60000
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.sessionCountdown !== nextProps.sessionTime) {
      this.setState({sessionCountdown: nextProps.sessionTime * 60000})
    }
    if (this.props.breakCountdown !== nextProps.breakTime) {
      this.setState({breakCountdown: nextProps.breakTime * 60000})
    }
    if (nextProps.isRunning === true) {
      console.log("Timer starting!");
    }
    if (nextProps.isRunning === false) {
      console.log("Timer paused.");
    }
  }

  countdownTimer() {

  }

  render() {

    return (
      <div id="timer-countdown">

      </div>
    )
  }
}

Timer.propTypes = {
  sessionTime: PropTypes.number.isRequired,
  breakTime: PropTypes.number.isRequired,
  isRunning: PropTypes.bool.isRequired
}

export default Timer;
