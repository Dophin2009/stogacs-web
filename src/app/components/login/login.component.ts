import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";

import { IAuthToken, IBasicAuth } from "../../models/auth.interface";
import { Login } from "../../store/actions/auth.actions";
import { IAppState } from "../../store/state/app.state";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(private _store: Store<IAppState>) {}

  ngOnInit() {}

  onSubmit() {
    const credentials: IBasicAuth = {
      username: this.email,
      password: this.password
    };
    this._store.dispatch(new Login(credentials));
  }
}
