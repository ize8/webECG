import React, { Component } from 'react';
import {observer} from 'mobx-react';
import mainStore from './Store.js';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { Message, Icon } from 'semantic-ui-react';

@observer class App extends Component {

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
      {mainStore.myVar}

      </div>
    );
  }
}

export default App;
