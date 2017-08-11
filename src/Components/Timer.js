import React from 'react';
import PropTypes from 'prop-types';
import '../style/Timer.css';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.countdownTimer = this.countdownTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);

    this.state = {
      // countdown timers are stored in state in ms as they are directly manipulated by the timer method.
      sessionCountdown: props.sessionTime * 60000,
      breakCountdown: props.breakTime * 60000,
      currTimer: "Session",
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.sessionTime !== nextProps.sessionTime) {
      let states = {sessionCountdown: nextProps.sessionTime * 60000}
      if (this.state.currTimer === "Session") {
        states.minutes = nextProps.sessionTime;
        states.seconds = "00";
      }
      this.setState({...states});
    }
    if (this.props.breakTime !== nextProps.breakTime) {
      let states = {breakCountdown: nextProps.breakTime * 60000}
      if (this.state.currTimer === "Break") {
        states.minutes = nextProps.breakTime;
        states.seconds = "00";
      }
      this.setState({...states});
    }
    if (this.props.isRunning === false && nextProps.isRunning === true) {
      this.countdownTimer(this.state.currTimer);
    }
    if (this.props.isRunning === true && nextProps.isRunning === false) {
      this.pauseTimer();
    }
  }

  componentDidUpdate() {
    if (this.state.sessionCountdown === 0) {
      this.pauseTimer(this.state.intervalId);
      let states = {
        currTimer: "Break",
        breakCountdown: this.props.breakTime * 60000,
        sessionCountdown: this.props.sessionTime * 60000,
      }
      this.setState({...states});
      this.countdownTimer("Break");
    }
    if (this.state.breakCountdown === 0) {
      this.pauseTimer(this.state.intervalId);
      let states = {
        currTimer: "Session",
        breakCountdown: this.props.breakTime * 60000,
        sessionCountdown: this.props.sessionTime * 60000,
      }
      this.setState({...states});
      this.countdownTimer("Session");
    }
  }

  countdownTimer(timerName) {
    var intervalId = setInterval(() => {
      var states = {};
      timerName === "Session" ? states.sessionCountdown = this.state.sessionCountdown - 1000 : states.breakCountdown = this.state.breakCountdown - 1000;
      this.setState({...states});
    }, 1000);
    this.setState({intervalId: intervalId});
  }

  pauseTimer() {
    clearInterval(this.state.intervalId);
  }

  render() {
    var minutes,
    seconds;
    var countdown = this.state.currTimer === "Session" ? this.state.sessionCountdown : this.state.breakCountdown;
    minutes = Math.floor(countdown/60000 % 60);
    seconds = Math.floor(countdown/1000 % 60);
    if (seconds < 10) {
      seconds = "0" + String(seconds);
    }
    return (
      <div id="timer-countdown" onClick={() => this.props.toggleTimer()}>
        <h2>{this.state.currTimer}</h2>
        <span>{minutes} : {seconds}</span>
      </div>
    )
  }
}

Timer.propTypes = {
  sessionTime: PropTypes.number.isRequired,
  breakTime: PropTypes.number.isRequired,
  isRunning: PropTypes.bool.isRequired,
  toggleTimer: PropTypes.func.isRequired
}

export default Timer;
