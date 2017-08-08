import React from 'react';
// import PropTypes from 'prop-types';
import Counter from './Counter';
import Timer from './Timer';
import '../style/App.css';

class App extends React.Component {
  constructor() {
    super();
    this.adjustTimers = this.adjustTimers.bind(this);

    this.state = {
      sessionTime: 25,
      breakTime: 5,
      isRunning: false
    }
  }

  adjustTimers(timer, timeDirection) {
    var states = {...this.state};
    if (this.state.isRunning === false && timeDirection === "+") {
      states[timer] += 1;
    }
    if (this.state.isRunning === false && timeDirection === "-") {
      states[timer] -= 1;
    }
    this.setState({...states});
  }

  render() {
    return (
      <div>
        SessionTime is {this.state.sessionTime}
        breakTime is {this.state.breakTime}
        <div id="counter-control-wrapper">
          <Counter name="sessionTime" adjustTimers={this.adjustTimers} timerTotal={this.state.sessionTime}/>
          <Counter name="breakTime" adjustTimers={this.adjustTimers} timerTotal={this.state.breakTime}/>
        </div>
        <Timer sessionTime={this.state.sessionTime} breakTime={this.state.breakTime}/>
      </div>
    )
  }
}

// App.propTypes = {
//
// }

export default App;
