import { Observable } from "rxjs";

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import { environment } from "../../environments/environment";
import { IAuthToken } from "../models/auth.interface";
import {
  ISignInRequest,
  ISignInSession,
  IUser
} from "../models/user.interface";
import { selectAuthToken } from "../store/selectors/auth.selectors";
import { IAppState } from "../store/state/app.state";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private readonly BASE_URL = environment.serviceHost + "/user";

  auth: IAuthToken;

  constructor(
    private _store: Store<IAppState>,
    private _httpClient: HttpClient
  ) {
    this._store.select(selectAuthToken).subscribe((auth: IAuthToken) => {
      this.auth = auth;
    });
  }

  getUser(): Observable<IUser> {
    const endpoint = `${this.BASE_URL}/self`;
    const base64 = this.getAuthString();

    return this._httpClient.get<IUser>(endpoint, {
      headers: {
        Authorization: `Basic ${base64}`
      }
    });
  }

  getSignInRequests(): Observable<ISignInRequest[]> {
    const endpoint = `${this.BASE_URL}/self/requests`;
    const base64 = this.getAuthString();

    return this._httpClient.get<ISignInRequest[]>(endpoint, {
      headers: {
        Authorization: `Basic ${base64}`
      }
    });
  }

  getSignInSession(sessionId: string): Observable<ISignInSession> {
    const endpoint = `${this.BASE_URL}/self/session/${sessionId}`;
    const base64 = this.getAuthString();
    return this._httpClient.get<ISignInSession>(endpoint, {
      headers: {
        Authorization: `Basic ${base64}`
      }
    });
  }

  signIn(request: ISignInRequest): Observable<ISignInRequest> {
    const endpoint = `${this.BASE_URL}/signin`;
    const base64 = this.getAuthString();

    return this._httpClient.put<ISignInRequest>(endpoint, request, {
      headers: {
        Authorization: `Basic ${base64}`
      }
    });
  }

  private getAuthString(): string {
    return window.btoa(`${this.auth.email}:${this.auth.token}`);
  }
}
