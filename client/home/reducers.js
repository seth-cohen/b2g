import { combineReducers } from "redux";
import {
  USER_LOGOUT,
  LOGIN_SUBMIT_SUCCESS,
  LOGIN_SUBMIT_FAILURE,
  LOGIN_CLEAR_ERRORS,
  REGISTRATION_SUBMIT_SUCCESS,
  REGISTRATION_SUBMIT_FAILURE,
  REGISTRATION_CLEAR_ERRORS
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

// - LOGIN - UI
function loginUI(state = { errors: {} }, { type, payload }) {
  switch (type) {
    case LOGIN_SUBMIT_FAILURE: {
      console.log(payload.errors);
      const errors = {};
      for (const error in payload.errors) {
        errors[`${error}Error`] = payload.errors[error].Message;
      }

      return {
        ...state,
        errors
      };
    }
    case LOGIN_CLEAR_ERRORS: {
      return {
        ...state,
        errors: {
          usernameError: "",
          passwordError: "",
          loginError: ""
        }
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
      const errors = payload.errors.map(error => {
        return { [error.Key]: error.Message };
      });
      return {
        ...state,
        errors
      };
    }
    case REGISTRATION_CLEAR_ERRORS:
      return {
        ...state,
        errors: {
          usernameError: "",
          passwordError: "",
          emailError: "",
          loginError: ""
        }
      };
    default:
      return state;
  }
}

function currentUser(state = 0, { type }) {
  switch (type) {
    default:
      return state;
  }
}

function users(state = { byID: {}, allIDs: [] }, { type }) {
  switch (type) {
    default:
      return state;
  }
}

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
    users,
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
