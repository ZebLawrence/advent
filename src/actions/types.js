import { createTypes } from 'reduxsauce';

export default createTypes(`
  KILL_ALL_WORKERS

  API_FAILURE
  API_REQUEST

  API_REQUEST_GET_PUZZLE_DATA
  API_RECEIVE_PUZZLE_DATA

`);