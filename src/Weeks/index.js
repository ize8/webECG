import { Card, message, Button, Icon, Select} from 'antd';
import 'antd/lib/card/style/css';
import 'antd/lib/message/style/css';
import 'antd/lib/button/style/css';
import 'antd/lib/icon/style/css';
import 'antd/lib/select/style/css';

import moment from 'moment';

import React, { Component } from 'react'

export default class Weeks extends Component {

    state = {
        weeks :[
            ['','','','','','',''],
        ],
    }

    getShift = name => this.props.shifts.find(e=>e.name==name);
    getWeekPA = e => e.reduce((total,shift)=>Number(total)+Number(shift=='' ? 0 : this.props.calcPA(this.getShift(shift)).PA),0);

    changeShift =(wk,day,value)=>{
        let temp = [...this.state.weeks];
        temp[wk][day] = value;
        this.setState({weeks:temp});
    }

    week = (e,i) => {
        const days = Array(7).fill(0).map((el,ind)=>
            <div key={`day${ind}`}>
                <Select style={{width:'150px'}} value={e[ind]=='' ? 'OFF' : e[ind]} onChange={value => this.changeShift(i,ind,value)}>
                    <Select.Option key={'OFF'} value={''}>OFF</Select.Option>
                    {this.props.shifts.map((x,y)=>
                        <Select.Option key={y} value={x.name}>{x.name}</Select.Option>
                    )}
                </Select>
            </div>
            );
        const totalPA = this.getWeekPA(e);
        return (
            <div key={i} style={{display:'flex'}}>
                <span style={{width:'30px', padding:'5px', backgroundColor:'lightgray'}}>{i+1}</span>
                {days}
                <span style={{width:'50px', padding:'5px', backgroundColor:'lightgray'}}>{Number(totalPA).toFixed(2)}</span>
            </div>
        );
    }

  render() {
    return (
      <div style={{display:'flex', flexDirection:'column'}}>
        <div style={{display:'flex'}}>
            <Button icon='plus' onClick={()=>this.setState({weeks:[...this.state.weeks,['','','','','','','']]})}/>
            <span>{`${this.state.weeks.length} weeks --> ${Number(this.state.weeks.reduce((total,wk)=>total+this.getWeekPA(wk),0)).toFixed(2)}PA`}</span>
        </div>
        {this.state.weeks.map((e,i)=>this.week(e,i))}
      </div>
    )
  }
}