import { RouterReducerState } from "@ngrx/router-store";

import { IAuthState, initialAuthState } from "./auth.state";
import { initialUserState, IUserState } from "./user.state";
import { IMeetingState, initialMeetingState } from './meeting.state';

export interface IAppState {
  router?: RouterReducerState;
  auth: IAuthState;
  user: IUserState;
  meetings: IMeetingState;
}

export const initialAppState: IAppState = {
  auth: initialAuthState,
  user: initialUserState,
  meetings: initialMeetingState
};

export function getInitialState(): IAppState {
  return initialAppState;
}
