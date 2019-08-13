import { IUser } from "src/app/models/user.interface";

import { EUserActions, UserActions } from "../actions/user.actions";
import { initialUserState, IUserState } from "../state/user.state";

export const userReducers = (
  state: IUserState = initialUserState,
  action: UserActions
): IUserState => {
  switch (action.type) {
    case EUserActions.GetUserSuccess: {
      return {
        ...state,
        user: action.payload as IUser
      }
    }
    default: {
      return state;
    }
  }
};
