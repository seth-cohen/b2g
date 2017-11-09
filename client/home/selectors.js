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
)
