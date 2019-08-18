import {
  EUserActions,
  GetSignInRequestsSuccessAction,
  GetSignInSessionSuccessAction,
  GetUserSuccessAction,
  SignInSuccessAction,
  UserActions
} from "../actions/user.actions";
import { initialUserState, IUserState } from "../state/user.state";

export function userReducers(
  state: IUserState = initialUserState,
  action: UserActions
): IUserState {
  switch (action.type) {
    case EUserActions.GetUserSuccess: {
      return {
        ...state,
        user: (action as GetUserSuccessAction).payload
      };
    }
    case EUserActions.GetUserFailure: {
      return {
        ...state,
        user: null
      };
    }
    case EUserActions.ClearUser: {
      return {
        ...state,
        user: null,
        signInRequests: []
      };
    }
    case EUserActions.GetSignInRequestsSuccess: {
      return {
        ...state,
        signInRequests: (action as GetSignInRequestsSuccessAction).payload
      };
    }
    case EUserActions.GetSignInSessionSuccess: {
      return {
        ...state,
        currentSignInSession: (action as GetSignInSessionSuccessAction).payload
      };
    }
    case EUserActions.ClearCurrentSignInSession: {
      return {
        ...state,
        currentSignInSession: null
      };
    }
    case EUserActions.SignInSuccess: {
      return {
        ...state,
        signInRequests: [
          ...state.signInRequests,
          (action as SignInSuccessAction).payload
        ]
      };
    }
    default: {
      return state;
    }
  }
}
