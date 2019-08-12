import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";

import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";

import {
  IAuthToken, IBasicAuth, IRegistration, IRegistrationResponse
} from "../../models/auth.interface";
import { AuthService } from "../../services/auth.service";
import {
  EAuthActions, Login, LoginFailure, LoginSuccess, Register, RegisterFailure,
  RegisterSuccess
} from "../actions/auth.actions";

@Injectable()
export class AuthEffects {
  constructor(
    private _authService: AuthService,
    private _actions$: Actions,
    private _router: Router
  ) {}

  @Effect()
  login$ = this._actions$.pipe(
    ofType(EAuthActions.Login),
    map((action: Login) => action.payload),
    switchMap((payload: IBasicAuth) =>
      this._authService.login(payload).pipe(
        map((token: IAuthToken) => new LoginSuccess(token)),
        catchError(error => of(new LoginFailure("Login failed")))
      )
    )
  );

  @Effect()
  register$ = this._actions$.pipe(
    ofType(EAuthActions.Register),
    map((action: Register) => action.payload),
    switchMap((payload: IRegistration) => {
      return this._authService.register(payload).pipe(
        map((response: IRegistrationResponse) => new RegisterSuccess(response)),
        catchError(error => of(new RegisterFailure("Registration failed")))
      );
    })
  );
}
