import { routerReducer } from "@ngrx/router-store";
import { ActionReducerMap } from "@ngrx/store";

import { IAppState } from "../state/app.state";
import { authReducers } from "./auth.reducers";
import { userReducers } from "./user.reducers";

export const appReducers: ActionReducerMap<IAppState> = {
  router: routerReducer,
  auth: authReducers,
  user: userReducers
};
