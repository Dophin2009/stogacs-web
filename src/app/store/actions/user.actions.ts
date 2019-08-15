import { HttpErrorResponse } from "@angular/common/http";
import { Action } from "@ngrx/store";

import { IBasicAuth } from "../../models/auth.interface";
import { IUser } from "../../models/user.interface";

export enum EUserActions {
  GetUser = "[User] Get User",
  GetUserSuccess = "[User] Get User Success",
  GetUserFailure = "[User] Get User Failure"
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

export type UserActions = GetUserAction | GetUserSuccessAction | GetUserFailureAction;
