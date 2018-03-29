import {applyMiddleware, combineReducers, createStore, compose} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';

import counterReducer from './Counter/counterReducer';

const reducers = combineReducers({
    counter: counterReducer,
});

const middleWare = applyMiddleware(thunk, createLogger());

const store = createStore(reducers, compose(
    middleWare,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));


export default store;