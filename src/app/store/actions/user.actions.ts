import { HttpErrorResponse } from "@angular/common/http";
import { Action } from "@ngrx/store";

import {
  ISignInRequest,
  ISignInSession,
  IUser
} from "../../models/user.interface";

export enum EUserActions {
  GetUser = "[User] Get User",
  GetUserSuccess = "[User] Get User Success",
  GetUserFailure = "[User] Get User Failure",
  ClearUser = "[User] Clear User",
  GetSignInRequests = "[User] Get Sign-In Requests",
  GetSignInRequestsSuccess = "[User] Get Sign-In Requests Success",
  GetSignInRequestsFailure = "[User] Get Sign-In Requests Failure",
  GetSignInSession = "[User] Get Sign-In Session",
  GetSignInSessionSuccess = "[User] Get Sign-In Session Success",
  GetSignInSessionFailure = "[User] Get Sign-In Session Failure",
  ClearCurrentSignInSession = "[User] Clear Current Sign-In Session",
  SignIn = "[User] SignIn",
  SignInSuccess = "[User] Sign-in Success",
  SignInFailure = "[User] Sign-in Failure"
}

export class GetUserAction implements Action {
  type = EUserActions.GetUser;
  constructor() {}
}

export class GetUserSuccessAction implements Action {
  type = EUserActions.GetUserSuccess;
  constructor(public payload: IUser) {}
}

export class GetUserFailureAction implements Action {
  type = EUserActions.GetUserFailure;
  constructor(public payload: HttpErrorResponse) {}
}

export class ClearUserAction implements Action {
  type = EUserActions.ClearUser;
  constructor() {}
}

export class GetSignInRequestsAction implements Action {
  type = EUserActions.GetSignInRequests;
  constructor() {}
}

export class GetSignInRequestsSuccessAction implements Action {
  type = EUserActions.GetSignInRequestsSuccess;
  constructor(public payload: ISignInRequest[]) {}
}

export class GetSignInRequestsFailureAction implements Action {
  type = EUserActions.GetSignInRequestsFailure;
  constructor(public payload: HttpErrorResponse) {}
}

export class GetSignInSessionAction implements Action {
  type = EUserActions.GetSignInSession;
  constructor(public payload: string) {}
}

export class GetSignInSessionSuccessAction implements Action {
  type = EUserActions.GetSignInSessionSuccess;
  constructor(public payload: ISignInSession) {}
}

export class GetSignInSessionFailureAction implements Action {
  type = EUserActions.GetSignInSessionFailure;
  constructor(public payload: HttpErrorResponse) {}
}

export class ClearCurrentSignInSessionAction implements Action {
  type = EUserActions.ClearCurrentSignInSession;
  constructor() {}
}

export class SignInAction implements Action {
  type = EUserActions.SignIn;
  constructor(public payload: ISignInRequest) {}
}

export class SignInSuccessAction implements Action {
  type = EUserActions.SignInSuccess;
  constructor(public payload: ISignInRequest) {}
}

export class SignInFailureAction implements Action {
  type = EUserActions.SignInFailure;
  constructor(public payload: HttpErrorResponse) {}
}

export type UserActions =
  | GetUserAction
  | GetUserSuccessAction
  | GetUserFailureAction
  | ClearUserAction
  | GetSignInRequestsAction
  | GetSignInRequestsSuccessAction
  | GetSignInRequestsFailureAction
  | GetSignInSessionAction
  | GetSignInSessionSuccessAction
  | GetSignInSessionFailureAction
  | ClearCurrentSignInSessionAction
  | SignInAction
  | SignInSuccessAction
  | SignInFailureAction;
