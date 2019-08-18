import {
  ISignInRequest,
  ISignInSession,
  IUser
} from "../../models/user.interface";

export interface IUserState {
  user: IUser;
  signInRequests: ISignInRequest[];
  currentSignInSession: ISignInSession; // maybe a hashmap or something of them all later
}

export const initialUserState: IUserState = {
  user: null,
  signInRequests: [],
  currentSignInSession: null
};
