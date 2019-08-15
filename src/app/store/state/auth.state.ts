import { IAuthToken } from "../../models/auth.interface";

export interface IAuthState {
  token: IAuthToken;
}

export const initialAuthState: IAuthState = {
  token: null
};
