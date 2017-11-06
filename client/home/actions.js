import {
  SUBMITTED_LOGIN_FORM,
  SUBMITTED_REGISTRATION_FORM,
  UPDATE_NAME,
  CLEAR_ERRORS
} from "./types";

function submitLoginForm(data) {
  return (dispatch, getState) => {
    console.log("data", data);
    console.log("state", getState());

    // fire off ajax request
    return dispatch({
      type: SUBMITTED_LOGIN_FORM,
      payload: { response: "this is the response" }
    });
  };
}

function submitRegistrationForm(data) {
  return (dispatch, getState) => {
    console.log("data", data);
    console.log("state", getState());

    const headers = new Headers();
    const init = {
      method: "POST",
      headers,
      credentials: "include",
      body: JSON.stringify({
        userName: data.userName
      })
    };

    fetch("/api/v1/users/create", init)
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        console.log("response", response);
        return dispatch({
          type: SUBMITTED_REGISTRATION_FORM,
          payload: {
            emailError:
              response.errors && response.errors.email
                ? response.errors.email.Message
                : ""
          }
        });
      });
  };
}

function updateName(userName) {
  return { type: UPDATE_NAME, payload: { userName } };
}

function clearErrors() {
  return { type: CLEAR_ERRORS, payload: {}}
}

export { submitLoginForm, submitRegistrationForm, updateName, clearErrors };
