import React, { Component } from 'react';
import './App.css';

import { Layout, Tabs, Spin, Modal, notification } from 'antd';
import 'antd/lib/layout/style/css';

import Counter from './Counter';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

class App extends Component {
  render() {
    return (
      <Layout>
      <Layout.Header 
        style={{
          width:'100%', 
          height:'100px', 
          margin:'0px', 
          backgroundColor:'white', 
          borderBottom:'0.5px solid gray',
          display:'grid',
          gridTemplateColumns:'100px auto',
          gridTemplateRows:'100px',
          alignItems:'center'
        }}>
          {this.props.user ?
          <svg onClick={(e,data)=>this.logout()} width='60px' height='60px' className='logout'>
            <g transform="scale(1.5)"><path fill='gray' d="m17.5 20c-1.4 0-2.5-1.1-2.5-2.5v-12.5c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5v12.5c0 1.4-1.1 2.5-2.5 2.5z m9.6-14.6c4.8 3.1
              7.9 8.5 7.9 14.6 0 9.7-7.8 17.5-17.5 17.5s-17.5-7.8-17.5-17.5c0-6.1 3.1-11.5 7.9-14.6 0.4-0.2 0.9-0.4 1.3-0.4 1.4 0 2.5 1.1 2.5 2.5 0 0.5-0.1 0.9-0.4 1.3-0.1 0.3-0.3 0.5-0.5 0.7-0.1 0-0.3 0.1-0.3 0.2-0.7 0.5-1.3 0.9-1.8 1.5-2.4 2.3-3.7 5.4-3.7 8.8s1.3 6.5 3.7 8.8 5.4 3.7 8.8 3.7 6.5-1.3
              8.8-3.7 3.7-5.4 3.7-8.8-1.3-6.5-3.7-8.8c-0.5-0.6-1.1-1-1.8-1.5 0-0.1-0.2-0.2-0.3-0.2-0.2-0.2-0.4-0.4-0.5-0.7-0.3-0.4-0.4-0.8-0.4-1.3 0-1.4 1.1-2.5 2.5-2.5 0.4 0 0.9 0.2 1.3 0.4z"/></g>
          </svg>
          : <div></div>}
        <div style={{display:'flex', flexDirection:'column', height:'100px'}}>
          <h1 style={{textAlign: 'center', fontSize: '35px', height:'60px', margin:'0px'}}>Starter Kit</h1>
          <span style={{textAlign: 'center', height:'40px', lineHeight:'40px'}}>...so it begins...</span>
        </div>
      </Layout.Header>
      <Layout.Content>
        <div className="App">

          <Counter />

        </div>
      </Layout.Content>
      </Layout>
    );
  }
}

const mapStateToProps = store =>
  ({
    counter: store.counter.counter
  });

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      
    }, dispatch);
  };

export default connect(mapStateToProps, mapDispatchToProps)(App);
