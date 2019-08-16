import { ISignInRequest, IUser } from "../../models/user.interface";

export interface IUserState {
  user: IUser;
  signInRequests: ISignInRequest[];
}

export const initialUserState: IUserState = {
  user: null,
  signInRequests: []
};
