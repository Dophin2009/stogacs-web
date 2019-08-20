import { IAuthToken } from "../../models/auth.interface";
import {
  AuthActions,
  EAuthActions,
  LoginSuccess
} from "../actions/auth.actions";
import {
  IAuthState,
  initialAuthState,
  LoginStateNotifier,
  RegistrationStateNotifier
} from "../state/auth.state";

export function authReducers(
  state: IAuthState = initialAuthState,
  action: AuthActions
): IAuthState {
  switch (action.type) {
    case EAuthActions.Login: {
      return {
        ...state,
        loginStateNotifier: LoginStateNotifier.PENDING
      };
    }
    case EAuthActions.LoginSuccess: {
      return {
        ...state,
        token: (action as LoginSuccess).payload,
        loginStateNotifier: LoginStateNotifier.SUCCESS
      };
    }
    case EAuthActions.LoginFailure: {
      return {
        ...state,
        loginStateNotifier: LoginStateNotifier.FAILURE
      };
    }
    case EAuthActions.ClearLoginStateNotifier: {
      return {
        ...state,
        loginStateNotifier: null
      };
    }
    case EAuthActions.Logout: {
      return {
        ...state,
        token: null
      };
    }
    case EAuthActions.Register: {
      return {
        ...state,
        registrationStateNotifier: RegistrationStateNotifier.PENDING
      };
    }
    case EAuthActions.RegisterSuccess: {
      return {
        ...state,
        registrationStateNotifier: RegistrationStateNotifier.SUCCESS
      };
    }
    case EAuthActions.RegisterFailure: {
      return {
        ...state,
        registrationStateNotifier: RegistrationStateNotifier.FAILURE
      };
    }
    case EAuthActions.ClearRegistrationStateNotifier: {
      return {
        ...state,
        registrationStateNotifier: null
      };
    }
    default: {
      return state;
    }
  }
}
