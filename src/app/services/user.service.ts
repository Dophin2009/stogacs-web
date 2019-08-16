import { Observable } from "rxjs";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { IBasicAuth } from "../models/auth.interface";
import { ISignInRequest, IUser } from "../models/user.interface";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private readonly BASE_URL = "https://192.168.19.22:4201/user";

  constructor(private httpClient: HttpClient) {}

  getUser(auth: IBasicAuth): Observable<IUser> {
    const endpoint = `${this.BASE_URL}/self`;
    const base64 = window.btoa(`${auth.username}:${auth.password}`);

    return this.httpClient.get<IUser>(endpoint, {
      headers: {
        Authorization: `Basic ${base64}`
      }
    });
  }

  signIn(
    auth: IBasicAuth,
    request: ISignInRequest
  ): Observable<ISignInRequest> {
    const endpoint = `${this.BASE_URL}/signin`;
    const base64 = window.btoa(`${auth.username}:${auth.password}`);

    return this.httpClient.put<ISignInRequest>(endpoint, request, {
      headers: {
        Authorization: `Basic ${base64}`
      }
    });
  }
}
