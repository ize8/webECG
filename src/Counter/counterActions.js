import {INC_COUNTER, DEC_COUNTER} from './types';

export const incCounter = i => {return {type:INC_COUNTER, payload:i}};
export const decCounter = i => {return {type:DEC_COUNTER, payload:i}};