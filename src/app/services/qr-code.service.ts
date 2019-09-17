import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { environment } from "../../environments/environment";
import { IAuthToken } from "../models/auth.interface";
import { selectAuthToken } from "../store/selectors/auth.selectors";
import { IAppState } from "../store/state/app.state";

@Injectable({
  providedIn: "root"
})
export class QrCodeService {
  private readonly BASE_URL = environment.serviceHost + "/admin/qr";

  auth: IAuthToken;

  constructor(
    private _store: Store<IAppState>,
    private _httpClient: HttpClient
  ) {
    this._store.select(selectAuthToken).subscribe((auth: IAuthToken) => {
      this.auth = auth;
    });
  }

  getSessionQrCodeImage(sessionId: string, qrCode: string): Observable<Blob> {
    const endpoint = `${this.BASE_URL}` + "/" + sessionId + ":" + qrCode;
    console.log('in qrcode service, endpoint:' + endpoint);
    return this.authorizedGetRequest(endpoint);
  }

  private authorizedGetRequest(sendpoint: string) {
    const base64 = window.btoa(`${this.auth.email}:${this.auth.token}`);
    return this._httpClient.get(sendpoint, {
      headers: {
        Authorization: `Basic ${base64}`
      }, responseType: 'blob'
    });
  }
}
