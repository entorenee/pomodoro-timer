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
      minutes: props.sessionTime,
      seconds: "00"
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.sessionTime !== nextProps.sessionTime) {
      this.setState({sessionCountdown: nextProps.sessionTime * 60000});
    }
    if (this.props.breakTime !== nextProps.breakTime) {
      this.setState({breakCountdown: nextProps.breakTime * 60000});
    }
    if (nextProps.isRunning === true && this.state.sessionCountdown > 0) { // Timer runs through session first
      console.log("Session timer starting!");
      this.countdownTimer(this.state.sessionCountdown);
    }
    if (nextProps.isRunning === true && this.state.sessionCountdown === 0 && this.state.breakCountdown > 0) { // Run break timer if session timer is zero
      console.log("Break timer starting!");
      this.countdownTimer(this.state.breakCountdown);
    }
    if (nextProps.isRunning === false) {
      this.pauseTimer();
      console.log("Timer paused.");
    }
  }

  countdownTimer(timerToRun) {
    var endTime = Date.now() + timerToRun;
    var currTimer = timerToRun === this.state.sessionCountdown ? "Session" : "Break";
    var intervalId = setInterval(() => {
      var states = {
        minutes: this.state.minutes,
        seconds: this.state.minutes,
      }
      currTimer === "Session" ? states.sessionCountdown = this.state.sessionCountdown - 1000 : states.breakCountdown = this.state.breakCountdown - 1000;
      var timeLeft = endTime - Date.now();
      states.minutes = Math.floor(timeLeft/60000 % 60);
      states.seconds = Math.floor(timeLeft/1000 % 60);
      if (states.seconds < 10) {
        states.seconds = "0" + String(states.seconds);
      }

      this.setState({...states});
    }, 1000);
    this.setState({
      intervalId: intervalId,
      currTimer: currTimer
    });
  }

  pauseTimer() {
    clearInterval(this.state.intervalId);
  }

  render() {

    return (
      <div id="timer-countdown">
        {this.state.minutes} : {this.state.seconds}
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
