import { createSelector } from "reselect";

// Private Route
const getLoginStatus = state => state.loginStatus;
export const getLoginStatusState = createSelector(
  getLoginStatus,
  loginStatus => {
    return loginStatus;
  }
);

// LOGIN
const getLoginUIErrorState = state => state.ui.login.errors;
export const getLoginNameError = createSelector(
  getLoginUIErrorState,
  loginErrors => {
    return loginErrors.usernameError || "";
  }
);

export const getLoginPasswordError = createSelector(
  getLoginUIErrorState,
  loginErrors => {
    return loginErrors.passwordError || "";
  }
);

export const getLoginGeneralError = createSelector(
  getLoginUIErrorState,
  loginErrors => {
    return loginErrors.loginError || "";
  }
);

// USER
const getCurrentUserID = state => state.currentUser;
const getUsers = state => state.entities.users;
export const getCurrentUsername = createSelector(
  [getCurrentUserID, getUsers], 
  (id, users) => {
    return users.allIDs.indexOf(id) !== -1 ? users.byID[id].username : ""
  }
);

// REGISTRATION
const getRegistrationUIErrorState = state => state.ui.registration.errors;
export const getRegistrationNameError = createSelector(
  getRegistrationUIErrorState,
  registrationErrors => {
    return registrationErrors.usernameError || "";
  }
);

export const getRegistrationPasswordError = createSelector(
  getRegistrationUIErrorState,
  registrationErrors => {
    return registrationErrors.passwordError || "";
  }
);

export const getRegistrationEmailError = createSelector(
  getRegistrationUIErrorState,
  registrationErrors => {
    return registrationErrors.emailError || "";
  }
);

export const getRegistrationGeneralError = createSelector(
  getRegistrationUIErrorState,
  registrationErrors => {
    return registrationErrors.registrationError || "";
  }
);
