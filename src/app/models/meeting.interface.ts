export interface IMeeting {
  id: number;
  date: string;
  val: number;
  signInSessionIds: number;
}

export interface ISignInRequest {
  id: string;
  userId: string;
  time: string;
  deviceInfo: string;
  sessionId: string;
  timecode: string;
  success?: boolean;
}

export interface ISignInSession {
  id: string;
  startTime: string;
  endTime: string;
  meetingId: number;
  sessionCodes: ISignInSessionCode[];
  codeRefresh: number;
  codeRefreshOffset: number;
  signInRequestIds: ISignInRequest[];
}

export interface ISignInSessionCode {
  code: string;
  startTime: string;
  endTime: string;
}
