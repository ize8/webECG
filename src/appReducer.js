import * as act from './types';

const defState = {
    PA : {
        dayStart : 7*60,
        oohStart : 19*60,
        dayTime : 4,
        ooh : 3
    },
    shifts : [
        {
            name:'day clinical',
            start: '08:30',
            end: '16:30',
            dcc: true,
            spa: false,
            we: false
        },
        {
            name:'late',
            start: '16:00',
            end: '00:00',
            dcc: true,
            spa: false,
            we: false
        },
        {
            name:'NC',
            start: '08:30',
            end: '18:30',
            dcc: false,
            spa: true,
            we: false
        },
        {
            name:'WE Early',
            start: '08:30',
            end: '18:30',
            dcc: true,
            spa: false,
            we: true
        },
        {
            name:'WE Late',
            start: '14:00',
            end: '00:00',
            dcc: true,
            spa: false,
            we: true
        },
        {
            name:'Short Early',
            start: '08:30',
            end: '16:30',
            dcc: true,
            spa: false,
            we: true
        },
        {
            name:'Short Late',
            start: '16:00',
            end: '00:00',
            dcc: true,
            spa: false,
            we: true
        },
        {
            name:'12-20',
            start: '12:00',
            end: '20:00',
            dcc: true,
            spa: false,
            we: false
        },
        {
            name:'08-18',
            start: '08:30',
            end: '18:30',
            dcc: true,
            spa: false,
            we: false
        },
    ],
    weeks : [],
}

const appReducer =(state=defState, action)=> {
    switch (action.type) {
        case act.SET_PA_DAYTIME: {
            console.log('hi')
            return {...state, PA: {...state.PA, dayTime:action.payload} } 
            break;
        }
        case act.SET_PA_OOH: {
            return {...state, PA: {...state.PA, ooh:action.payload} } 
            break;
        }
        case act.ADD_SHIFT: {
            return {...state, shifts:[...state.shifts, action.payload]}
            break;
        }
        case act.DELETE_SHIFT: {
            return {...state, shifts:state.shifts.filter(e => e.name!= action.payload)}
            break;
        }
        default: 
            return state;
    }
}

export default appReducer;