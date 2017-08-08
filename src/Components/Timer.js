import React from 'react';
import PropTypes from 'prop-types';
import '../style/Timer.css';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionCountdown: props.sessionTime,
      breakCountdown: props.breakTime
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.sessionCountdown !== nextProps.sessionTime) {
      this.setState({sessionCountdown: nextProps.sessionTime})
    }
    if (this.props.breakCountdown !== nextProps.breakTime) {
      this.setState({breakCountdown: nextProps.breakTime})
    }
    if (nextProps.isRunning === true) {
      console.log("Timer starting!");
    }
    if (nextProps.isRunning === false) {
      console.log("Timer paused.");
    }
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
