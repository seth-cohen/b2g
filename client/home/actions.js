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
  // Returning a promise so that the calling site can redirect on successful completion of login
  return new Promise((resolve, reject) => {
    dispatch({ type: LOGIN_SET_ERRORS, payload: {} });

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
const submitRegistrationForm = data => dispatch => {
  // Returning a promise so that the calling site can redirect on successful completion of registering
  return new Promise((resolve, reject) => {
    dispatch({ type: REGISTRATION_SET_ERRORS, payload: {} });

    const headers = new Headers();
    var form = new FormData();
    form.append("username", data.username);
    form.append("password", data.password);
    form.append("email", data.email);

    const init = {
      method: "POST",
      headers,
      credentials: "include",
      body: form
    };

    fetch("/api/v1/users", init)
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
        dispatch({
          type: USER_ADD_NEW,
          payload: { user: data.currentUser }
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
              type: REGISTRATION_SUBMIT_FAILURE,
              payload: { errors }
            });
          });
        reject();
      });
  });
};

const checkUsername = username => dispatch => {
  dispatch(setRegistrationErrors({ usernameError: "" }));
  const init = {
    method: "GET",
    headers: new Headers(),
    credentials: "include"
  };

  fetch(`/api/v1/users/username/${username}`, init).then(response => {
    if (response.ok) {
      // The username already exists
      return dispatch(
        setRegistrationErrors({ usernameError: "Username is already taken" })
      );
    }

    return dispatch(setRegistrationErrors({ usernameError: "" }));
  });
};

function setLoginErrors(errors) {
  return { type: LOGIN_SET_ERRORS, payload: errors };
}

function setRegistrationErrors(errors) {
  return { type: REGISTRATION_SET_ERRORS, payload: errors };
}

export {
  submitLoginForm,
  setLoginErrors,
  submitRegistrationForm,
  checkUsername,
  setRegistrationErrors,
  logoutUser
};
