import { IAuthToken } from "../../models/auth.interface";
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
        token: action.payload as IAuthToken
      };
    }
    case EAuthActions.LoginFailure: {
      return {
        ...state
      };
    }
    case EAuthActions.Logout: {
      return {
        ...state,
        token: null
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
