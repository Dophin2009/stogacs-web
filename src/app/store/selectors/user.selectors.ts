import { createSelector } from "@ngrx/store";

import { IAppState } from "../state/app.state";
import { IUserState } from "../state/user.state";

export const selectUserState = (state: IAppState): IUserState => state.user;

export const selectUser = createSelector(
  selectUserState,
  (state: IUserState) => state.user
);

export const selectSignInRequests = createSelector(
  selectUserState,
  (state: IUserState) => state.signInRequests
);

export const selectCurrentSignInSession = createSelector(
  selectUserState,
  (state: IUserState) => state.currentSignInSession
);
