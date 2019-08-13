export interface IAuthToken {
  email: string,
  token: string,
  expirationDate: string
}

export interface IBasicAuth {
  username: string,
  password: string
}

export interface IRegistration {
  name: string;
  email: string;
  grade: number;
  password: string;
  matchingPassword: string;
}

export interface IRegistrationResponse {
  message: string;
}