export interface IMeeting {
  id: number;
  date: string;
  val: number;
  signInSessionIds: string[];
}

export interface ISignInRequest {
  id: string;
  userId: string;
  time: number;
  deviceInfo: string;
  sessionId: string;
  timecode: string;
  success?: boolean;
}

export interface ISignInSession {
  id: string;
  startTime: number;
  endTime: number;
  meetingId: number;
  sessionCodes: ISignInSessionCode[];
  codeRefresh: number;
  codeRefreshOffset: number;
  signInRequestIds: string[];
}

export interface ISignInSessionCode {
  code: string;
  startTime: number;
  endTime: number;
  endsIn: number;
}
