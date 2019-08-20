import { IAuthToken } from "../../models/auth.interface";

export enum RegistrationStateNotifier {
  PENDING,
  SUCCESS,
  FAILURE
}

export enum LoginStateNotifier {
  PENDING,
  SUCCESS,
  FAILURE
}

export interface IAuthState {
  token: IAuthToken;
  registrationStateNotifier: RegistrationStateNotifier;
  loginStateNotifier: LoginStateNotifier;
}

export const initialAuthState: IAuthState = {
  token: null,
  registrationStateNotifier: null,
  loginStateNotifier: null
};
