import { createSelector } from "@ngrx/store";

import { IAppState } from "../state/app.state";
import { IAuthState } from "../state/auth.state";

export const selectAuth = (state: IAppState) => state.auth;

export const selectAuthToken = createSelector(
  selectAuth,
  (state: IAuthState) => state.token
);

export const selectRegistrationStateNotifier = createSelector(
  selectAuth,
  (state: IAuthState) => state.registrationStateNotifier
);

export const selectLoginStateNotifier = createSelector(
  selectAuth,
  (state: IAuthState) => state.loginStateNotifier
);
