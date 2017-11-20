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
    return users.allIDs.indexOf(id) !== -1 ? users.byID[id].username : "";
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

// DASHBOARD
const getUserGames = state => state.entities.userGames;
const getGames = state => state.entities.games;
const getUserPlatforms = state => state.entities.userPlatforms;
const getPlatforms = state => state.entities.platforms;
export const getCurrentUser = createSelector(
  [getUsers, getCurrentUserID],
  (users, currentUserID) => users.byID[currentUserID]
);

export const getUser = userID =>
  createSelector([getUsers], users => {
    return users.byID[userID];
  });

export const getPlatformsForUser = userID =>
  createSelector(
    [getUserPlatforms, getPlatforms, getUser(userID)],
    (userPlatforms, platforms, user) => {
      return user.platforms.map(userPlatformID => {
        const userPlatform = userPlatforms.byID[userPlatformID];
        return {
          ...userPlatform,
          platform: platforms.byID[userPlatform.platformID]
        };
      });
    }
  );

export const getGamesForUser = userID =>
  createSelector(
    [getUserGames, getGames, getPlatforms, getUser(userID)],
    (userGames, games, platforms, user) => {
      return user.games.map(userGameID => {
        const userGame = userGames.byID[userGameID];
        return {
          ...userGame,
          game: games.byID[userGame.gameID],
          platform: platforms.byID[userGame.platformID]
        };
      });
    }
  );
