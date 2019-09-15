import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap, switchMap, take } from "rxjs/operators";

import { ISignInRequest, ISignInSession } from "../../models/meeting.interface";
import { IUser } from "../../models/user.interface";
import { UserService } from "../../services/user.service";
import { LogoutAction } from "../actions/auth.actions";
import {
  EUserActions,
  GetSignInRequestsAction,
  GetSignInRequestsFailureAction,
  GetSignInRequestsSuccessAction,
  GetSignInSessionAction,
  GetSignInSessionFailureAction,
  GetSignInSessionSuccessAction,
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
    switchMap(() => {
      return this._userService.getUser().pipe(
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
  getSignInRequests$ = this._actions$.pipe(
    ofType(EUserActions.GetSignInRequests),
    switchMap(() => {
      return this._userService.getSignInRequests().pipe(
        map((response: ISignInRequest[]) => {
          response = response.sort((r1, r2) => {
            return new Date(r2.time).valueOf() - new Date(r1.time).valueOf();
          });
          return new GetSignInRequestsSuccessAction(response);
        }),
        catchError(error => of(new GetSignInRequestsFailureAction(error)))
      );
    })
  );

  @Effect()
  getSignInSession = this._actions$.pipe(
    ofType(EUserActions.GetSignInSession),
    map((action: GetSignInSessionAction) => action.payload),
    switchMap((payload: string) => {
      return this._userService.getSignInSession(payload).pipe(
        map(
          (response: ISignInSession) =>
            new GetSignInSessionSuccessAction(response)
        ),
        catchError(error => of(new GetSignInSessionFailureAction(error)))
      );
    })
  );

  @Effect()
  putSignInRequest$ = this._actions$.pipe(
    ofType(EUserActions.SignIn),
    map((action: SignInAction) => action.payload),
    switchMap((payload: ISignInRequest) => {
      return this._userService.signIn(payload).pipe(
        map((response: ISignInRequest) => new SignInSuccessAction(response)),
        catchError((error: HttpErrorResponse) =>
          of(new SignInFailureAction(error))
        )
      );
    })
  );

  @Effect()
  putSignInRequestSuccess$ = this._actions$.pipe(
    ofType(EUserActions.SignInSuccess),
    take(1),
    mergeMap((action: GetSignInRequestsSuccessAction) => {
      return [action, new GetSignInRequestsAction()];
    })
  );
}
