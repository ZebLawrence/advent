import types from './types';

const requestPuzzleData = day => {
    return {
        endPoint: `/2020/day/${day}/input`,
        ajaxType: 'GET',
        type: types.API_REQUEST_GET_PUZZLE_DATA,
        onSuccess: response => { return receivePuzzleData(response, day); },
        fetchName: 'fetchingPuzzleData'
    };
};

const receivePuzzleData = (response, day) => {
    return {
        type: types.API_RECEIVE_PUZZLE_DATA,
        response,
        day
    };
};

export {
    requestPuzzleData,
    receivePuzzleData
}
