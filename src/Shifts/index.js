import { Card, message, Button, Icon, Input, Radio, TimePicker, Switch } from 'antd';
import 'antd/lib/card/style/css';
import 'antd/lib/message/style/css';
import 'antd/lib/button/style/css';
import 'antd/lib/icon/style/css';
import 'antd/lib/input/style/css';
import 'antd/lib/radio/style/css';
import 'antd/lib/time-picker/style/css';
import 'antd/lib/switch/style/css';

import moment from 'moment';

import React, { Component } from 'react'

export default class Shifts extends Component {

    state = {
        add : false,
        new : {
            name: '',
            start:'08:30',
            end:'16:30',
            dcc:true,
            spa:false,
            we:false,
        }
    }

    onAdd =()=> {
        const shift = this.state.new;
        if (shift.name!='' && this.props.shifts.findIndex(e=>e.name==shift.name)==-1) {
            if (shift.start!=''&&shift.end!='') this.props.add(shift);
            else message.warning('Shift needs to have a start and an end!');
        }
        else message.warning('Shift name needs to be unique!');
        //this.resetNew();
    }

    onDelete = e => {
        this.props.delete (e.name);
    }

    resetNew =()=> {
        this.setState({
            new : {
            name: '',
            start:'08:30',
            end:'16:30',
            dcc:true,
            spa:false,
            we:false,
        }});
    }

  render() {
      const newShift  = this.state.new;
    return (
      <div style={{display:'grid', gridGap:'5px', gridTemplateColumns:'170px'}}>
        {this.state.add ? 
        <Card 
            key={'add new shift'}
            title={<div style={{textAlign:'center'}} onClick={()=>this.setState({add:false})}>Add shift</div>}
            actions={
                [<Icon type="plus" onClick={this.onAdd}/>]
            }
        >
        
            <span>name</span>
            <Input size='small' value={newShift.name} onChange={e=>this.setState({new:{...newShift, name:e.target.value}})}></Input>
            <span>start</span>
            <TimePicker format={'HH:mm'} value={moment(newShift.start, 'HH:mm')} minuteStep={5} size='small' onChange={e=>this.setState({new:{...newShift, start:e.format('HH:mm')}})}/>
            <span>finish</span>
            <TimePicker format={'HH:mm'} value={moment(newShift.end, 'HH:mm')} minuteStep={5} size='small' onChange={e=>this.setState({new:{...newShift, end:e.format('HH:mm')}})}/>
            <Radio.Group size='small' defaultValue='dcc' style={{marginTop:'5px'}}
                onChange={e=>{
                    if (e.target.value == 'dcc') this.setState({new:{...newShift, dcc:true, spa:false}});
                    if (e.target.value == 'spa') this.setState({new:{...newShift, dcc:false, spa:true}});
                }}
            >
                <Radio.Button value='dcc'>dcc</Radio.Button>
                <Radio.Button value='spa'>spa</Radio.Button>
            </Radio.Group>
            <Switch checkedChildren="WE" unCheckedChildren="day" onChange={e=>this.setState({new:{...newShift, we:e}})}/>

        </Card>
        : <Button icon='plus' onClick={()=>this.setState({add:true})}></Button>}
        {
            this.props.shifts.map((e,i)=>
            {
                const PA = this.props.calcPA(e);
                return (
                <Card key={i} 
                    title={<div style={{textAlign:'center'}}>{e.name}</div>}
                    actions={
                        [<Icon type="edit" />, <Icon type="delete" onClick={()=>this.onDelete(e)}/>]
                    }
                >
                    <div style={{display:'flex', flexDirection:'column'}}>
                        <span>{e.start} - {e.end}</span>
                        <span style={{color:'gray', fontSize:'10px'}}>{`${Number(PA.duration/60).toFixed(1)} hrs = `}{PA.PA}{e.dcc ? ' DCC' : ' SPA'}</span>
                    </div>
                </Card>
                );
            }
            )
        }
      </div>
    )
  }
}

