export interface IUser {
  id: string;
  name: string;
  email: string;
  grade: number;
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
