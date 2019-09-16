import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap, switchMap, take } from "rxjs/operators";

import { ISignInRequest, ISignInSession, IMeeting } from "../../models/meeting.interface";
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
import { EMeetingsActions, GetMeetingsSuccessAction, GetMeetingsFailureAction, GetMeetingsRequestAction, 
  GetMeetingSessionsRequestAction, GetMeetingSessionsSuccessAction, GetMeetingSessionFailureAction } from '../actions/meetings.actions';
import { MeetingService } from 'src/app/services/meeting.service';

@Injectable()
export class MeetingsEffects {
  constructor(
    private _meetingService: MeetingService,
    private _actions$: Actions,
    private _router: Router
  ) {}

  @Effect()
  getMeetings$ = this._actions$.pipe(
    ofType(EMeetingsActions.GetMeetingsRequest),
    switchMap(() => {
      return this._meetingService.getMeetings().pipe(
        map((response: IMeeting[]) => {
          if(response && response.length > 0) {
            return new GetMeetingsSuccessAction(response);
          }
        }),
        catchError(error => of(new GetMeetingsFailureAction(error)))
      );
    })
  );

  @Effect()
  getMeetingSessions$ = this._actions$.pipe(
    ofType(EMeetingsActions.GetMeetingSessionsRequest),
    switchMap((action) => {
      return this._meetingService.getMeetingSessions((action as GetMeetingSessionsRequestAction).payload).pipe(
        map((response: ISignInSession[]) => {
          if(response && response.length > 0) {
            return new GetMeetingSessionsSuccessAction(response);
          }
        }),
        catchError(error => of(new GetMeetingSessionFailureAction(error)))
      );
    })
  );

}
