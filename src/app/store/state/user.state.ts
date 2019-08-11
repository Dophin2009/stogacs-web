import { IUser } from "src/app/models/user.interface";

export interface IUserState {
  user: IUser;
}

export const initialUserState: IUserState = {
  user: null
};