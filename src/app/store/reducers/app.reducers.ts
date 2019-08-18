import { storageSync } from "@larscom/ngrx-store-storagesync";
import { routerReducer } from "@ngrx/router-store";
import { ActionReducer, ActionReducerMap, createReducer } from "@ngrx/store";

import { IAppState } from "../state/app.state";
import { authReducers } from "./auth.reducers";
import { userReducers } from "./user.reducers";

export const appReducers: ActionReducerMap<IAppState> = {
  router: routerReducer,
  auth: authReducers,
  user: userReducers
};

export function storageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return storageSync<IAppState>({
    features: [{ stateKey: "auth" }],
    storage: window.localStorage
  })(reducer);
}
