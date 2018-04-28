import {applyMiddleware, combineReducers, createStore, compose} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';

import counterReducer from './Counter/counterReducer';

const reducers = combineReducers({
    counter: counterReducer,
});

const middleWare = applyMiddleware(thunk, createLogger());

let devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
if (process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'production' || devTools===undefined) {
    devTools = a => a;
}

const store = createStore(reducers, compose(
    middleWare,
    devTools,
));


export default store;