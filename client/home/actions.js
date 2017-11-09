import {
  USER_LOGOUT,
  LOGIN_SUBMIT_SUCCESS,
  LOGIN_SUBMIT_FAILURE,
  LOGIN_CLEAR_ERRORS,
  REGISTRATION_SUBMIT_SUCCESS,
  REGISTRATION_SUBMIT_FAILURE,
  REGISTRATION_CLEAR_ERRORS
} from "./types";

function logoutUser() {
  return dispatch => {
    // fire off ajax request
    const headers = new Headers();

    const init = {
      method: "POST",
      headers,
      credentials: "include"
    };

    fetch("/api/v1/logout", init)
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        console.log("response", response);
        return dispatch({
          type: USER_LOGOUT
        });
      });
  };
}

// LOGIN
const submitLoginForm = data => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({ type: LOGIN_CLEAR_ERRORS });

    // fire off ajax request
    const headers = new Headers();
    var form = new FormData();
    form.append("username", data.username);
    form.append("password", data.password);

    const init = {
      method: "POST",
      headers,
      credentials: "include",
      body: form
    };

    fetch("/api/v1/login", init)
      .then(function(response) {
        if (response.ok) {
          return response.json();
        }

        const error = new Error("Failed connecting to server.");
        error.response = response;
        throw error;
      })
      .then(data => {
        const { loginStatus } = data;
        dispatch({
          type: LOGIN_SUBMIT_SUCCESS,
          payload: { loginStatus }
        });
        resolve();
      })
      .catch(error => {
        console.log(
          "There has been a problem with your fetch operation: " + error.message
        );
        error.response &&
          error.response.json().then(data => {
            const { errors } = data;
            dispatch({
              type: LOGIN_SUBMIT_FAILURE,
              payload: { errors }
            });
          });
        reject();
      });
  });
};

// REGISTRATION
function submitRegistrationForm(data) {
  return dispatch => {
    dispatch({ type: REGISTRATION_CLEAR_ERRORS });

    const headers = new Headers();
    const init = {
      method: "POST",
      headers,
      credentials: "include",
      body: JSON.stringify({
        username: data.username
      })
    };

    fetch("/api/v1/users/create", init)
      .then(function(response) {
        if (response.ok) {
          return response.json();
        }

        const error = new Error("Failed connecting to server.");
        error.response = response;
        throw error;
      })
      .then(data => {
        const { loginStatus } = data;
        dispatch({
          type: REGISTRATION_SUBMIT_SUCCESS,
          payload: { loginStatus }
        });
      })
      .catch(error => {
        console.log(
          "There has been a problem with your fetch operation: " + error.message
        );
        error.response &&
          error.response.json().then(data => {
            const { errors } = data;
            dispatch({
              type: REGISTRATION_SUBMIT_FAILURE,
              payload: { errors }
            });
          });
      });
  };
}

function clearLoginErrors() {
  return { type: LOGIN_CLEAR_ERRORS, payload: {} };
}

function clearRegisrationErrors() {
  return { type: REGISTRATION_CLEAR_ERRORS, payload: {} };
}

export {
  submitLoginForm,
  clearLoginErrors,
  submitRegistrationForm,
  clearRegisrationErrors,
  logoutUser
};
