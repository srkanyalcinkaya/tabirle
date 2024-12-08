import { combineReducers } from 'redux';
import appSlice from './app/appSlice';
import modalSlice from './modalSlice';

const rootReducer = combineReducers({
    app: appSlice,
    modal:modalSlice
});

export default rootReducer;
