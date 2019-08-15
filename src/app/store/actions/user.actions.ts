import { Action } from "@ngrx/store";

export enum EUserActions {
  GetUser = "[User] Get User"
}

export class GetUser implements Action {
  type = EUserActions.GetUser;
  constructor(public payload: string) {}
}

export type UserActions = GetUser;