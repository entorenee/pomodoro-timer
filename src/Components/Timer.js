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
      minutes: props.sessionTime,
      seconds: "00"
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.sessionTime !== nextProps.sessionTime) {
      var states = {sessionCountdown: nextProps.sessionTime * 60000}
      if (this.state.currTimer === "Session") {
        states.minutes = nextProps.sessionTime;
        states.seconds = "00";
      }
      this.setState({...states});
    }
    if (this.props.breakTime !== nextProps.breakTime) {
      var states = {breakCountdown: nextProps.breakTime * 60000}
      if (this.state.currTimer === "Break") {
        states.minutes = nextProps.breakTime;
        states.seconds = "00";
      }
      this.setState({...states});
    }
    if (nextProps.isRunning === true) {
      console.log("Session timer starting!");
      this.countdownTimer(this.state.currTimer);
    }
    if (nextProps.isRunning === false) {
      this.pauseTimer();
      console.log("Timer paused.");
    }
  }

  componentDidUpdate() {
    if (this.state.minutes === 0 && this.state.seconds === "00") {
      this.pauseTimer(this.state.intervalId);
      var newTimer = this.state.currTimer === "Session" ? "Break" : "Session";
      this.setState({currTimer: newTimer});
      this.countdownTimer(newTimer);
    }
  }

  countdownTimer(timerName) {
    var timerValue = timerName === "Session" ? this.state.sessionCountdown : this.state.breakCountdown;
    var endTime = Date.now() + timerValue;
    var intervalId = setInterval(() => {
      var states = {
        minutes: this.state.minutes,
        seconds: this.state.minutes,
      }
      timerName === "Session" ? states.sessionCountdown = this.state.sessionCountdown - 1000 : states.breakCountdown = this.state.breakCountdown - 1000;
      var timeLeft = endTime - Date.now();
      states.minutes = Math.floor(timeLeft/60000 % 60);
      states.seconds = Math.floor(timeLeft/1000 % 60);
      if (states.seconds < 10) {
        states.seconds = "0" + String(states.seconds);
      }

      this.setState({...states});
    }, 1000);
    this.setState({intervalId: intervalId});
  }

  pauseTimer() {
    clearInterval(this.state.intervalId);
  }

  render() {

    return (
      <div id="timer-countdown" onClick={() => this.props.toggleTimer()}>
        {this.state.minutes} : {this.state.seconds}
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
