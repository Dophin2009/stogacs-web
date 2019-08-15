import { createSelector } from "@ngrx/store";

import { IAppState } from "../state/app.state";
import { IUserState } from "../state/user.state";

export const selectUser = createSelector(
  (state: IAppState): IUserState => state.user,
  (state: IUserState) => state.user
);
