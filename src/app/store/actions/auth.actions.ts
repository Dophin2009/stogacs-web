import { HttpErrorResponse } from "@angular/common/http";
import { Action } from "@ngrx/store";

import {
  IAuthToken,
  IBasicAuth,
  IRegistration,
  IRegistrationResponse
} from "../../models/auth.interface";

export enum EAuthActions {
  Login = "[Auth] Login",
  LoginSuccess = "[Auth] Login Success",
  LoginFailure = "[Auth] Login Failure",
  ClearLoginStateNotifier = "[Auth] Clear Login State",
  Logout = "[Auth] Logout",
  Register = "[Auth] Register",
  RegisterSuccess = "[Auth] Register Success",
  RegisterFailure = "[Auth] Register Failure",
  ClearRegistrationStateNotifier = "[Auth] Clear Registration State"
}

export class Login implements Action {
  type = EAuthActions.Login;
  constructor(public payload: IBasicAuth) {}
}

export class LoginSuccess implements Action {
  type = EAuthActions.LoginSuccess;
  constructor(public payload: IAuthToken) {}
}

export class LoginFailure implements Action {
  type = EAuthActions.LoginFailure;
  constructor(public payload: HttpErrorResponse) {}
}

export class ClearLoginStateNotifier implements Action {
  type = EAuthActions.ClearLoginStateNotifier;
  constructor() {}
}

export class LogoutAction implements Action {
  type = EAuthActions.Logout;
  constructor() {}
}

export class Register implements Action {
  type = EAuthActions.Register;
  constructor(public payload: IRegistration) {}
}

export class RegisterSuccess implements Action {
  type = EAuthActions.RegisterSuccess;
  constructor(public payload: IRegistrationResponse) {}
}

export class RegisterFailure implements Action {
  type = EAuthActions.RegisterFailure;
  constructor(public payload: HttpErrorResponse) {}
}

export class ClearRegistrationStateAction implements Action {
  type = EAuthActions.ClearRegistrationStateNotifier;
  constructor() {}
}

export type AuthActions =
  | Login
  | LoginSuccess
  | LoginFailure
  | ClearLoginStateNotifier
  | LogoutAction
  | Register
  | RegisterSuccess
  | RegisterFailure
  | ClearRegistrationStateAction;
