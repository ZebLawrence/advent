import { combineReducers } from 'redux';
import puzzleReducer from './puzzleReducer';
import utilityReducer from './utilityReducer';

const reducers = combineReducers({
    utility: utilityReducer,
    puzzleData: puzzleReducer
});

const rootReducer = (state, action) => {
    return reducers(state, action);
};

export default rootReducer;