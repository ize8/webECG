import * as act from './types';

export const setDayTimePA = i => ({type:act.SET_PA_DAYTIME, payload:i});
export const setOohPA = i => ({type:act.SET_PA_OOH, payload:i});
export const addShift = i => ({type:act.ADD_SHIFT, payload:i});
export const deleteShift = i => ({type:act.DELETE_SHIFT, payload:i});