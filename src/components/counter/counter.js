import React from 'react';
import './counter.css';

class Counter extends React.Component {
  constructor(props) {
    super(props)
    this.state = { count: props.initialCount }
    this.handleIncrement = this.handleIncrement.bind(this)
    this.handleDecrement = this.handleDecrement.bind(this)
  }

  handleIncrement() {
    this.setState(prevState => { return { count: prevState.count + 1 } });
  }
  handleDecrement() {
    this.setState(prevState => { return { count: prevState.count - 1 } });
  }
  render() {
    return (
      <div className="counter-container">
        <button className="decrement" onClick={this.handleDecrement}>-</button>
        <div className="number">{this.state.count}</div>
        <button className="increment" onClick={this.handleIncrement}>+</button>
      </div>
    );
  }
}

export default Counter;