import { Observable } from "rxjs";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { IBasicAuth } from "../models/auth.interface";
import { IUser } from "../models/user.interface";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private readonly BASE_URL = "http://localhost:8080/user";

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
}
