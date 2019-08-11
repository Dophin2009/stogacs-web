import { Observable } from "rxjs";

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import {
  IAuthToken, IBasicAuth, IRegistration, IRegistrationResponse
} from "../models/auth.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly BASE_URL = "http://localhost:8080/user/auth";

  constructor(private httpClient: HttpClient) { }

  register(registration: IRegistration): Observable<IRegistrationResponse> {
    const endpoint = `${this.BASE_URL}/register`;
    const response =  this.httpClient.post<IRegistrationResponse>(endpoint, registration);
    return response;
  }

  login(auth: IBasicAuth): Observable<IAuthToken> {
    const endpoint = `${this.BASE_URL}/token`;
    const base64 = window.btoa(`${auth.username}:${auth.password}`);

    const response = this.httpClient.post<IAuthToken>(endpoint, null, {
      headers: {
        "Authorization": `Basic ${base64}`
      }
    });
    return response;
  }

}
