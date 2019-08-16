import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Store } from "@ngrx/store";

import { IAuthToken } from "../../models/auth.interface";
import { IUser } from "../../models/user.interface";
import { LogoutAction } from "../../store/actions/auth.actions";
import {
  ClearUserAction,
  GetUserAction
} from "../../store/actions/user.actions";
import { selectAuth } from "../../store/selectors/auth.selectors";
import { selectUser } from "../../store/selectors/user.selectors";
import { IAppState } from "../../store/state/app.state";
import { LoginComponent } from "../login/login.component";
import { ScannerComponent } from "../scanner/scanner.component";
import { SignUpComponent } from "../sign-up/sign-up.component";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.scss"]
})
export class LandingComponent implements OnInit {
  authToken: IAuthToken;
  user: IUser;

  constructor(private _store: Store<IAppState>, private dialog: MatDialog) {}

  ngOnInit() {
    this._store.select(selectAuth).subscribe(authToken => {
      this.authToken = authToken;

      if (this.authToken != null) {
        this._store.dispatch(
          new GetUserAction({
            username: this.authToken.email,
            password: this.authToken.token
          })
        );
      }
    });

    this._store.select(selectUser).subscribe(user => {
      this.user = user;
    });
  }

  openLogin() {
    this.dialog.open(LoginComponent, {
      height: "80%",
      minHeight: "250px",
      maxHeight: "300px",
      width: "80%",
      minWidth: "300px",
      maxWidth: "350px",
      autoFocus: true
    });
  }

  openRegistration() {
    this.dialog.open(SignUpComponent, {
      height: "80%",
      minHeight: "400px",
      maxHeight: "575px",
      width: "80%",
      minWidth: "300px",
      maxWidth: "350px",
      autoFocus: true
    });
  }

  openScanner() {
    this.dialog.open(ScannerComponent, {
      height: "90%",
      maxHeight: "600px",
      width: "90%",
      autoFocus: true
    });
  }

  dispatchLogout() {
    this._store.dispatch(new LogoutAction());
    this._store.dispatch(new ClearUserAction());
  }
}
