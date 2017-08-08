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
    this.setState({
      sessionCountdown: nextProps.sessionTime,
      breakCountdown: nextProps.breakTime
    });
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
  breakTime: PropTypes.number.isRequired
}

export default Timer;
