import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import * as counter from './counterActions';

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

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      incCounter: counter.incCounter, 
      decCounter: counter.decCounter,
    }, dispatch);
  };

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
