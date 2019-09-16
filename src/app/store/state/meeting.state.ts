import { IUser } from "../../models/user.interface";
import { ISignInSession, ISignInRequest, IMeeting } from '../../models/meeting.interface';
import { HttpErrorResponse } from '@angular/common/http';

export interface IMeetingState {
  meetings: IMeeting[];
  currentMeeting: IMeeting;
  meetingSessions: ISignInSession[];
  currentSession: ISignInSession;

  error: any
}

export const initialMeetingState: IMeetingState = {
  meetings: null,
  currentMeeting: null,
  meetingSessions: null,
  currentSession: null,
  error:null
};
