import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";

import { IBasicAuth } from "../../models/auth.interface";
import { IUser } from "../../models/user.interface";
import { UserService } from "../../services/user.service";
import { LogoutAction } from "../actions/auth.actions";
import {
  EUserActions, GetUserAction, GetUserFailureAction, GetUserSuccessAction
} from "../actions/user.actions";

@Injectable()
export class UserEffects {
  constructor(private _userService: UserService, private _actions$: Actions) {}

  @Effect()
  getUser$ = this._actions$.pipe(
    ofType(EUserActions.GetUser),
    map((action: GetUserAction) => action.payload),
    switchMap((payload: IBasicAuth) => {
      return this._userService.getUser(payload).pipe(
        map((response: IUser) => new GetUserSuccessAction(response)),
        catchError(error =>
          of(new GetUserFailureAction("Failed to fetch user data"))
        )
      );
    })
  );

  @Effect()
  getUserFailure$ = this._actions$.pipe(
    ofType(EUserActions.GetUserFailure),
    map((action: GetUserFailureAction) => new LogoutAction())
  );
}
