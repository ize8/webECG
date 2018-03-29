import {INC_COUNTER, DEC_COUNTER} from './types';

const counterReducer =(state={counter:0}, action)=> {
    switch (action.type) {
        case INC_COUNTER: {
            return {...state, counter: state.counter + action.payload } 
            break;
        }
        case DEC_COUNTER: {
            return {...state, counter: state.counter - action.payload } 
            break;
        }
        default: 
            return state;
    }
}

export default counterReducer;