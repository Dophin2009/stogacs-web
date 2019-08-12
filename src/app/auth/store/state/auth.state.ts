import { IAuthToken } from "src/app/auth/models/auth.interface";

export interface IAuthState {
  authenticated: boolean;
  token: string;
}

export const initialAuthState: IAuthState = {
  authenticated: false,
  token: null
}