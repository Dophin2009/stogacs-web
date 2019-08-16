import { of } from "rxjs";
import { catchError, map, switchMap, take, tap } from "rxjs/operators";

import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";

import { IBasicAuth } from "../../models/auth.interface";
import { ISignInRequest, IUser } from "../../models/user.interface";
import { UserService } from "../../services/user.service";
import { LogoutAction } from "../actions/auth.actions";
import {
  EUserActions,
  GetUserAction,
  GetUserFailureAction,
  GetUserSuccessAction,
  SignInAction,
  SignInFailureAction,
  SignInSuccessAction
} from "../actions/user.actions";

@Injectable()
export class UserEffects {
  constructor(
    private _userService: UserService,
    private _actions$: Actions,
    private _router: Router
  ) {}

  @Effect()
  getUser$ = this._actions$.pipe(
    ofType(EUserActions.GetUser),
    map((action: GetUserAction) => action.payload),
    switchMap((payload: IBasicAuth) => {
      return this._userService.getUser(payload).pipe(
        map((response: IUser) => new GetUserSuccessAction(response)),
        catchError(error => of(new GetUserFailureAction(error)))
      );
    })
  );

  @Effect()
  getUserFailure$ = this._actions$.pipe(
    ofType(EUserActions.GetUserFailure),
    map((action: GetUserFailureAction) => action.payload),
    switchMap((payload: HttpErrorResponse) => {
      if (payload.status === 401) {
        return of(new LogoutAction());
      }
      return of();
    })
  );

  @Effect()
  putSignInRequest$ = this._actions$.pipe(
    ofType(EUserActions.SignIn),
    map((action: SignInAction) => action.payload),
    switchMap((payload: { auth: IBasicAuth; request: ISignInRequest }) => {
      return this._userService.signIn(payload.auth, payload.request).pipe(
        map((response: ISignInRequest) => new SignInSuccessAction(response)),
        catchError((error: HttpErrorResponse) =>
          of(new SignInFailureAction(error))
        )
      );
    })
  );
}
