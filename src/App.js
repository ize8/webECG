import React, { Component } from 'react';
import './App.css';

import { Layout, Spin, notification, Input, InputNumber } from 'antd';
import 'antd/lib/layout/style/css';
import 'antd/lib/spin/style/css';
import 'antd/lib/notification/style/css';
import 'antd/lib/input/style/css';
import 'antd/lib/input-number/style/css';


import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import Shifts from './Shifts';
import Weeks from './Weeks';

import * as app from './appActions';

class App extends Component {

  getDuration = e => {
    const startHours = parseInt(e.start.slice(0,2));
    const startMinutes = parseInt(e.start.slice(3)); 
    const start = startHours*60+startMinutes;

    const endHours = parseInt(e.end.slice(0,2));
    const endMinutes = parseInt(e.end.slice(3));
    const finish = endHours*60+endMinutes;

    const oohStart = this.props.PA.oohStart;
    const dayStart = this.props.PA.dayStart;

    const duration = start > finish ? finish+(24*60)-start : finish-start;

    if (e.we) return {inHours :0, OOH:duration, duration:duration};

    if (start < oohStart && start >= dayStart && finish < oohStart && finish >= dayStart)
        return {inHours :finish-start, OOH:0, duration:duration}
    if (start < oohStart && start >= dayStart && finish >= oohStart || finish < dayStart)
        return {inHours :oohStart-start, OOH:finish>=oohStart ? finish-oohStart : finish+5*60, duration:duration}
    if (start < dayStart || start >= oohStart && finish < oohStart && finish >= dayStart)
        return {inHours :finish-dayStart, OOH:start<dayStart ? dayStart-start : (24*60-start)+dayStart, duration:duration}
    if (start < dayStart && finish > oohStart)
        return {inHours :oohStart-dayStart, OOH:finish-oohStart+dayStart-start, duration:duration}
    if (start > oohStart && finish < dayStart)
        return {inHours :0, OOH:(24*60)-start+finish, duration:duration}
    
    return {
        inHours: 0,
        duration: 0,
        OOH: 0,
        error: true,
    }
}

calcPA =(shift)=> {
    const dur = this.getDuration(shift);
    const PA = Number(dur.inHours/60/this.props.PA.dayTime + dur.OOH/60/this.props.PA.ooh).toFixed(2)
    return {...dur, PA:PA}
}

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
          <h1 style={{textAlign: 'center', fontSize: '35px', height:'60px', margin:'0px'}}>Job plan designer</h1>
          <span style={{textAlign: 'center', height:'40px', lineHeight:'40px'}}></span>
        </div>
      </Layout.Header>
      <Layout.Content>
        <div className="App" style={{display:'flex', flexDirection:'column'}}>
            <div><span>[07:00 - 19:00] 1 PA =</span><InputNumber value={this.props.PA.dayTime} 
              onChange={e => this.props.setDayTimePA(e)}></InputNumber>hours</div>
            <div><span>[19:00 - 07:00] 1 PA =</span><InputNumber value={this.props.PA.ooh} 
              onChange={e => this.props.setOohPA(e)}></InputNumber>hours</div>
            <div style={{display:'flex', flexDirection:'row'}}>
              <Shifts shifts={this.props.shifts} calcPA={this.calcPA} add={this.props.addShift} delete={this.props.deleteShift} change={this.props.updateShift}/>
              <Weeks shifts={this.props.shifts} calcPA={this.calcPA}/>
            </div>
        </div>
      </Layout.Content>
      </Layout>
    );
  }
}

const mapStateToProps = store =>
  ({
    PA: store.app.PA,
    shifts: store.app.shifts,
    weeks: store.app.weeks,
  });

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      setDayTimePA : app.setDayTimePA,
      setOohPA: app.setOohPA,
      addShift: app.addShift,
      deleteShift: app.deleteShift,
      updateShift : app.updateShift,
    }, dispatch);
  };

export default connect(mapStateToProps, mapDispatchToProps)(App);
