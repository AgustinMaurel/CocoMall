import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { storeReducer } from './shopReducer';

const reducers = combineReducers({
    auth: authReducer,
    stores: storeReducer,
});

export default reducers;
