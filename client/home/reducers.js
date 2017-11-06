import { combineReducers } from "redux";
import {
  UPDATE_NAME,
  SUBMITTED_LANDING_FORM,
  SUBMITTED_REGISTRATION_FORM,
  CLEAR_ERRORS
} from "./types";

function login(state = { userName: "" }, { type, payload }) {
  switch (type) {
    case UPDATE_NAME:
      return {
        ...state,
        userName: payload.userName
      };
    case SUBMITTED_LANDING_FORM:
      return {
        ...state,
        userName: payload.response
      };

    case SUBMITTED_REGISTRATION_FORM: {
      const emailError = payload.emailError;
      return {
        ...state,
        emailError
      };
    }
    case CLEAR_ERRORS:
      return {
        ...state,
        emailError: "",
        userNameError: "",
        passwordError: ""
      };
    default:
      return state;
  }
}

const homeApp = combineReducers({
  login: login
});

export default homeApp;
