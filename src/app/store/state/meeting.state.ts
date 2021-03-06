import { IUser } from "../../models/user.interface";
import { ISignInSession, ISignInRequest, ISignInSessionCode, IMeeting } from '../../models/meeting.interface';
import { HttpErrorResponse } from '@angular/common/http';

export interface IMeetingState {
  meetings: IMeeting[];
  currentMeeting: IMeeting;
  meetingSessions: ISignInSession[];
  currentSession: ISignInSession;
  currentQrCode: string;  
  cycleSessionCode: ISignInSessionCode;
  currentQrCodeImage: Blob;
  error: any
}

export const initialMeetingState: IMeetingState = {
  meetings: null,
  currentMeeting: null,
  meetingSessions: null,
  currentSession: null,
  currentQrCode: null,
  cycleSessionCode: null,
  currentQrCodeImage: null,
  error:null
};
