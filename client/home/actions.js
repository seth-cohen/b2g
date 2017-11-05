import { SUBMITTED_LOGIN_FORM, UPDATE_NAME } from "./types";

function submitLoginForm(data) {
  return (dispatch, getState) => {
    console.log('data', data);
    console.log('state', getState());

    // fire off ajax request
    return dispatch({ type: SUBMITTED_LOGIN_FORM, response: "this is the response"});
  }
}

function updateName(userName) {
  return { type: UPDATE_NAME, userName };
}

export {
  submitLoginForm,
  updateName
}
