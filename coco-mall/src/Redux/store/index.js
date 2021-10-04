import { createStore, applyMiddleware, compose } from 'redux';
import reducers from '../reducers';
import thunk from 'redux-thunk';

const composeEnhancers =
    (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default store;
