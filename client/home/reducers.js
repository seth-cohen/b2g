import { combineReducers } from 'redux';
import { UPDATE_NAME, SUBMITED_LANDING_FORM } from './types'

function login(state = {userName: ""}, action) {
  switch (action.type) {
    case UPDATE_NAME:
      return {
        ...state,
        userName: action.userName
      }
    case SUBMITED_LANDING_FORM:
      return {
        ...state,
        userName: action.response
      }
    default:
      return state;
  }
}

const homeApp = combineReducers({
  login: login
});

export default homeApp;