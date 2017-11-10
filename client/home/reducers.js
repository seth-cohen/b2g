import { combineReducers } from "redux";
import {
  USER_LOGOUT,
  USER_ADD_NEW,
  LOGIN_SUBMIT_SUCCESS,
  LOGIN_SUBMIT_FAILURE,
  LOGIN_SET_ERRORS,
  REGISTRATION_SUBMIT_SUCCESS,
  REGISTRATION_SUBMIT_FAILURE,
  REGISTRATION_SET_ERRORS
} from "./types";

// LOGIN
function loginStatus(state = 0, { type, payload }) {
  switch (type) {
    case REGISTRATION_SUBMIT_SUCCESS:
    case LOGIN_SUBMIT_SUCCESS:
      return payload.loginStatus;
    case USER_LOGOUT:
      return 0;
    default:
      return state;
  }
}

function currentUser(state = 0, { type, payload }) {
  switch (type) {
    case USER_LOGOUT:
      return 0;
    case USER_ADD_NEW:
      return payload.user.id
    default:
      return state;
  }
}

// - LOGIN - UI
function loginUI(state = { errors: {} }, { type, payload }) {
  switch (type) {
    case LOGIN_SUBMIT_FAILURE: {
      const errors = {};
      for (const error in payload.errors) {
        errors[`${error}Error`] = payload.errors[error].Message;
      }

      return {
        ...state,
        errors
      };
    }
    case LOGIN_SET_ERRORS: {
      const newErrors = {};
      if (Object.keys(payload).length !== 0) {
        // We are clearing all errors if payload is empty
        for (const error in state.errors) {
          newErrors[error] = state.errors[error];
        }
        for (const error in payload) {
          newErrors[error] = payload[error];
        }
      }

      return {
        ...state,
        errors: newErrors
      };
    }
    default:
      return state;
  }
}

// - REGISTRATION - UI
function registrationUI(state = { errors: {} }, { type, payload }) {
  switch (type) {
    case REGISTRATION_SUBMIT_FAILURE: {
      const errors = {};
      for (const error in payload.errors) {
        errors[`${error}Error`] = payload.errors[error].Message;
      }

      return {
        ...state,
        errors
      };
    }
    case REGISTRATION_SET_ERRORS: {
      const newErrors = {};
      if (Object.keys(payload).length !== 0) {
        // We are clearing all errors if payload is empty
        for (const error in state.errors) {
          newErrors[error] = state.errors[error];
        }
        for (const error in payload) {
          newErrors[error] = payload[error];
        }
      }

      return {
        ...state,
        errors: newErrors
      };
    }
    default:
      return state;
  }
}

// USERS
function usersByID(state = {}, { type, payload }) {
  switch (type) {
    case USER_ADD_NEW:
      return {
        ...state,
        [payload.user.id]: payload.user
      };
    default:
      return state;
  }
}

function allUsers(state = [], { type, payload }) {
  switch (type) {
    case USER_ADD_NEW:
      return state.concat(payload.user.id)
    default:
      return state;
  }
}

const usersReducer = combineReducers({ byID: usersByID, allIDs: allUsers });

function userGames(state = { byID: {}, allIDs: [] }, { type }) {
  switch (type) {
    default:
      return state;
  }
}

function games(state = { byID: {}, allIDs: [] }, { type }) {
  switch (type) {
    default:
      return state;
  }
}

function platforms(state = { byID: {}, allIDs: [] }, { type }) {
  switch (type) {
    default:
      return state;
  }
}

const homeApp = combineReducers({
  loginStatus,
  currentUser,
  entities: combineReducers({
    users: usersReducer,
    userGames,
    games,
    platforms
  }),
  ui: combineReducers({
    login: loginUI,
    registration: registrationUI
  })
});

export default homeApp;
