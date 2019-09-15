import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { environment } from "../../environments/environment";
import { IAuthToken } from "../models/auth.interface";
import { selectAuthToken } from "../store/selectors/auth.selectors";
import { IAppState } from "../store/state/app.state";
import { IUser } from "../models/user.interface";
import { ISignInSession } from '../models/meeting.interface';

@Injectable({
  providedIn: "root"
})
export class AdminService {
  private readonly BASE_URL = environment.serviceHost + "/admin";

  auth: IAuthToken;

  constructor(
    private _store: Store<IAppState>,
    private _httpClient: HttpClient
  ) {
    this._store.select(selectAuthToken).subscribe((auth: IAuthToken) => {
      this.auth = auth;
    });
  }

  getUsers(): Observable<IUser[]> {
    const endpoint = `${this.BASE_URL}/users`;
    return this.authorizedGetRequest<IUser[]>(endpoint);
  }

  getUser(userId: string): Observable<IUser> {
    const endpoint = `${this.BASE_URL}/users/${userId}`;
    return this.authorizedGetRequest<IUser>(endpoint);
  }

  getSignInSessions(): Observable<ISignInSession[]> {
    const endpoint = `${this.BASE_URL}/signin/sessions`;
    return this.authorizedGetRequest<ISignInSession[]>(endpoint);
  }

  getSignInSession(sessionId: string): Observable<ISignInSession> {
    const endpoint = `${this.BASE_URL}/signin/sessions/${sessionId}`;
    return this.authorizedGetRequest<ISignInSession>(endpoint);
  }

  getQrCode(sessionId: string, timecode: string): Observable<Blob> {
    const endpoint = `${this.BASE_URL}/qr/${sessionId}:${timecode}`;
    return this.authorizedGetRequest<Blob>(endpoint);
  }

  private authorizedGetRequest<T>(endpoint: string): Observable<T> {
    const base64 = window.btoa(`${this.auth.email}:${this.auth.token}`);
    return this._httpClient.get<T>(endpoint, {
      headers: {
        Authorization: `Basic ${base64}`
      }
    });
  }
}
