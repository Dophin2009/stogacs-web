import { IAuthToken } from "src/app/models/auth.interface";
import { IUser } from "src/app/models/user.interface";

import { AuthActions, EAuthActions } from "../actions/auth.actions";
import { IAuthState, initialAuthState } from "../state/auth.state";

export const authReducers = (
  state: IAuthState = initialAuthState,
  action: AuthActions
): IAuthState => {
  switch (action.type) {
    case EAuthActions.LoginSuccess: {
      return {
        ...state,
        authenticated: true,
        token: (action.payload as IAuthToken).token
      };
    }
    case EAuthActions.LoginFailure: {
      return {
        ...state,
        authenticated: false
      };
    }
    case EAuthActions.RegisterSuccess: {
      return {
        ...state
      };
    }
    case EAuthActions.RegisterFailure: {
      return {
        ...state
      };
    }
    default: {
      return state;
    }
  }
};
