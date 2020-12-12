import types from '../actions/types';
import { createReducer } from 'reduxsauce';

export const INITIAL_STATE = {
    fetchingPuzzleData: false,
    data: {}
};

const requestPuzzleData = (state, action) => {
    return Object.assign({}, state, {
        fetchingPuzzleData: true
    });
};

const receivePuzzleData = (state, action) => {
    return Object.assign({}, state, {
        fetchingPuzzleData: false,
        data: {...state.data, [action.day]: action.response}
    });  
};


const ACTION_HANDLERS = {
    [types.API_REQUEST_GET_PUZZLE_DATA]: requestPuzzleData,
    [types.API_RECEIVE_PUZZLE_DATA]: receivePuzzleData
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);