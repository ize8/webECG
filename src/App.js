import React, { Component } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { Message, Icon } from 'semantic-ui-react';

import Counter from './Counter';
import {connect} from 'react-redux';

@connect((store)=>{
  return {
    counter: store.counter
  };
})

class App extends Component {
  render() {
    return (
      <div className="App">

      <Message size='small' icon floating attached='top'>
        <Icon 
          name="power"
          className='logout'
          size='big'
          circular
          onClick={null}
        />
        <Message.Content>
          <h1 style={{textAlign: 'center', fontSize: '35px'}}>Starter Kit</h1>
          <p style={{textAlign: 'center'}}>...hopefully more useful than Lorenzo...</p>
        </Message.Content>
      </Message>
      
      <Counter />

      </div>
    );
  }
}

export default App;
