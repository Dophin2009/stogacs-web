import { createSelector } from "@ngrx/store";

import { IAppState } from "../state/app.state";
import { IAuthState } from "../state/auth.state";

export const selectAuth = createSelector(
  (state: IAppState) => state.auth,
  (state: IAuthState) => state
);
