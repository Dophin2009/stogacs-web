import { IAuthToken } from "src/app/models/auth.interface";

export interface IAuthState {
  token: IAuthToken
}

export const initialAuthState: IAuthState = {
  token: null
}