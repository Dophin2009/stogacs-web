import { Observable } from "rxjs";

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { IUser } from "../models/user.interface";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private static BASE_URL = "http://localhost:8080/user";

  constructor(private httpClient: HttpClient) {}

  
}