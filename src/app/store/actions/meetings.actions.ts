import { HttpErrorResponse } from "@angular/common/http";
import { Action } from "@ngrx/store";

import { IUser } from "../../models/user.interface";
import { ISignInRequest, ISignInSession, IMeeting } from 'src/app/models/meeting.interface';

export enum EMeetingsActions {
  // Get meetings
  GetMeetingsRequest = "[Meetings] Get Meetings Request",
  GetMeetingsSuccess = "[Meetings] Get Meetings Success",
  GetMeetingsFailure = "[Meetings] Get Meetings Failure",

  // Update current meeting
  UpdateCurrentMeetingRequest = "[Meetings] Update Current Meeting Request",
  UpdateCurrentMeetingSuccess = "[Meetings] Update Current Meeting Success",
  UpdateCurrentMeetingFailure = "[Meetings] Update Current Meeting Failure",

  // Get meeting sessions
   GetMeetingSessionsRequest = "[Meetings] Get Meeting Sessions Request",
   GetMeetingSessionsSuccess = "[Meetings] Get Meeting Sessions Success",
   GetMeetingSessionsFailure = "[Meetings] Get Meeting Sessions Failure",
 
  // Update current session
  UpdateCurrentSessionRequest = "[Meetings] Update Current Session Request",
  UpdateCurrentSessionSuccess = "[Meetings] Update Current Session Success",
  UpdateCurrentSessionFailure = "[Meetings] Update Current Session Failure",

 }

// Get meetings
export class GetMeetingsRequestAction implements Action {
  type = EMeetingsActions.GetMeetingsRequest;
  constructor() {}
}

export class GetMeetingsSuccessAction implements Action {
  type = EMeetingsActions.GetMeetingsSuccess;
  constructor(public payload: IMeeting[]) {}
}

export class GetMeetingsFailureAction implements Action {
  type = EMeetingsActions.GetMeetingsFailure;
  constructor(public payload: HttpErrorResponse) {}
}

// update current meeting
export class UpdateCurrentMeetingRequestAction implements Action {
  type = EMeetingsActions.UpdateCurrentMeetingRequest;
  constructor(public payload:IMeeting ) {}
}

export class UpdateCurrentMeetingSuccessAction implements Action {
  type = EMeetingsActions.UpdateCurrentMeetingSuccess;
  constructor(public payload:IMeeting) {}
}

export class UpdateCurrentMeetingFailureAction implements Action {
  type = EMeetingsActions.UpdateCurrentMeetingFailure;
  constructor(public payload: HttpErrorResponse) {}
}

// Get sessions
export class GetMeetingSessionsRequestAction implements Action {
  type = EMeetingsActions.GetMeetingSessionsRequest;
  constructor(public payload:number) {}
}

export class GetMeetingSessionsSuccessAction implements Action {
  type = EMeetingsActions.GetMeetingSessionsSuccess;
  constructor(public payload: ISignInSession[]) {}
}

export class GetMeetingSessionFailureAction implements Action {
  type = EMeetingsActions.GetMeetingSessionsFailure;
  constructor(public payload: HttpErrorResponse) {}
}

// update current session
export class UpdateCurrentSessionRequestAction implements Action {
  type = EMeetingsActions.UpdateCurrentSessionRequest;
  constructor(public payload:ISignInSession ) {}
}

export class UpdateCurrentSessionSuccessAction implements Action {
  type = EMeetingsActions.UpdateCurrentSessionSuccess;
  constructor(public payload:ISignInSession) {}
}

export class UpdateCurrentSessionFailureAction implements Action {
  type = EMeetingsActions.UpdateCurrentSessionFailure;
  constructor(public payload: HttpErrorResponse) {}
}

export type MeetingsActions = 
GetMeetingsRequestAction | 
GetMeetingsSuccessAction | 
GetMeetingsFailureAction |
UpdateCurrentMeetingRequestAction |
UpdateCurrentMeetingSuccessAction |
UpdateCurrentMeetingFailureAction |
GetMeetingSessionsRequestAction |
GetMeetingSessionsSuccessAction |
GetMeetingSessionFailureAction |
UpdateCurrentSessionRequestAction |
UpdateCurrentSessionSuccessAction |
UpdateCurrentSessionFailureAction;
