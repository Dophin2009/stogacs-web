import { Observable } from "rxjs";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import { IAuthToken, IBasicAuth } from "../models/auth.interface";
import { ISignInRequest, IUser } from "../models/user.interface";
import { selectAuth } from "../store/selectors/auth.selectors";
import { IAppState } from "../store/state/app.state";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private readonly BASE_URL = "https://192.168.19.22:4201/user";

  auth: IAuthToken;

  constructor(
    private _store: Store<IAppState>,
    private _httpClient: HttpClient
  ) {
    this._store.select(selectAuth).subscribe((auth: IAuthToken) => {
      this.auth = auth;
    });
  }

  getUser(): Observable<IUser> {
    const endpoint = `${this.BASE_URL}/self`;
    const base64 = this.convertToBase64(this.auth);

    return this._httpClient.get<IUser>(endpoint, {
      headers: {
        Authorization: `Basic ${base64}`
      }
    });
  }

  getSignInRequests(): Observable<ISignInRequest[]> {
    const endpoint = `${this.BASE_URL}/self/requests`;
    const base64 = this.convertToBase64(this.auth);

    return this._httpClient.get<ISignInRequest[]>(endpoint, {
      headers: {
        Authorization: `Basic ${base64}`
      }
    });
  }

  signIn(request: ISignInRequest): Observable<ISignInRequest> {
    console.log(this.auth);
    const endpoint = `${this.BASE_URL}/signin`;
    const base64 = this.convertToBase64(this.auth);

    return this._httpClient.put<ISignInRequest>(endpoint, request, {
      headers: {
        Authorization: `Basic ${base64}`
      }
    });
  }

  private convertToBase64(auth: IAuthToken): string {
    return window.btoa(`${auth.email}:${auth.token}`);
  }
}
