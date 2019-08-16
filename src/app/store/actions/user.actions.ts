import { HttpErrorResponse } from "@angular/common/http";
import { Action } from "@ngrx/store";

import { IBasicAuth } from "../../models/auth.interface";
import { ISignInRequest, IUser } from "../../models/user.interface";

export enum EUserActions {
  GetUser = "[User] Get User",
  GetUserSuccess = "[User] Get User Success",
  GetUserFailure = "[User] Get User Failure",
  ClearUser = "[User] Clear User",
  SignIn = "[User] SignIn",
  SignInSuccess = "[User] Sign-in Success",
  SignInFailure = "[User] Sign-in Failure"
}

export class GetUserAction implements Action {
  type = EUserActions.GetUser;
  constructor(public payload: IBasicAuth) {}
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

export class SignInAction implements Action {
  type = EUserActions.SignIn;
  constructor(public payload: { auth: IBasicAuth; request: ISignInRequest }) {}
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
  | SignInAction
  | SignInSuccessAction
  | SignInFailureAction;
