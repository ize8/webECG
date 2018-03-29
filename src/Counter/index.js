import React, { Component } from 'react';
import {connect} from 'react-redux';

import {incCounter, decCounter} from './counterActions';

class Counter extends Component {

  plus =(i)=> {
    this.props.incCounter(i);
  }

  minus =(i)=> {
    this.props.decCounter(i);
  }

  render() {
    return (
      <div style={{display:'flex'}}>
        <button onClick={()=>this.plus(1)}>+</button>
        {this.props.counter}
        <button onClick={()=>this.minus(1)}>-</button>
      </div>
    )
  }
}

const mapStateToProps = store =>
  ({
    counter: store.counter.counter
  });

export default connect(mapStateToProps, {incCounter, decCounter})(Counter);
