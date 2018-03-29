import {INC_COUNTER, DEC_COUNTER} from './types';

export const incCounter = i => ({type:INC_COUNTER, payload:i});
export const decCounter = i => ({type:DEC_COUNTER, payload:i});