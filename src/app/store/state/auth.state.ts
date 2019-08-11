import { IAuthToken } from "src/app/models/auth.interface";

export interface IAuthState {
  authenticated: boolean;
  token: string;
}

export const initialAuthState: IAuthState = {
  authenticated: false,
  token: null
}