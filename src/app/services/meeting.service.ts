import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { environment } from "../../environments/environment";
import { IAuthToken } from "../models/auth.interface";
import { selectAuthToken } from "../store/selectors/auth.selectors";
import { IAppState } from "../store/state/app.state";
import { IMeeting, ISignInSession } from '../models/meeting.interface';

@Injectable({
  providedIn: "root"
})
export class MeetingService {
  private readonly BASE_URL = environment.serviceHost + "/admin/meetings";

  auth: IAuthToken;

  constructor(
    private _store: Store<IAppState>,
    private _httpClient: HttpClient
  ) {
    this._store.select(selectAuthToken).subscribe((auth: IAuthToken) => {
      this.auth = auth;
    });
  }

  getMeetings(): Observable<IMeeting[]> {
    const endpoint = `${this.BASE_URL}`;
    return this.authorizedGetRequest<IMeeting[]>(endpoint);
  }

  getMeetingSessions(meetingId:number): Observable<ISignInSession[]> {
    const endpoint = `${this.BASE_URL}` + "/" + meetingId + "/sessions";
    return this.authorizedGetRequest<ISignInSession[]>(endpoint);
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
