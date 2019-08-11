import { EUserActions, UserActions } from "../actions/user.actions";
import { IAppState, initialAppState } from "../state/app.state";
import { initialUserState, IUserState } from "../state/user.state";

export const userReducers = (
  state: IUserState = initialUserState,
  action: UserActions
): IUserState => {
  switch (action.type) {
    case EUserActions.GetUser: {
      return {
        ...state,
      }
    }
    default: {
      return state;
    }
  }
};
