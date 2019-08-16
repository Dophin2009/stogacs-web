import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";

import { IAuthToken, IBasicAuth } from "../../models/auth.interface";
import { ISignInRequest, IUser } from "../../models/user.interface";
import { ScannerService } from "../../services/scanner.service";
import { GetUserAction, SignInAction } from "../../store/actions/user.actions";
import { selectAuth } from "../../store/selectors/auth.selectors";
import { selectUser } from "../../store/selectors/user.selectors";
import { IAppState } from "../../store/state/app.state";

@Component({
  selector: "app-scanner",
  templateUrl: "./scanner.component.html",
  styleUrls: ["./scanner.component.scss", "../shared.styles.scss"]
})
export class ScannerComponent implements OnInit {
  result: string = "No scan";
  user: IUser;
  auth: IAuthToken;

  constructor(
    private _store: Store<IAppState>,
    private _scannerService: ScannerService
  ) {}

  ngOnInit() {
    this._store.select(selectAuth).subscribe(auth => {
      this.auth = auth;
    });
    this._store.select(selectUser).subscribe(user => {
      this.user = user;
    });

    if (this.auth != null) {
      this._store.dispatch(
        new GetUserAction({
          username: this.auth.email,
          password: this.auth.token
        })
      );
    }
  }

  scan() {
    this._scannerService.scan("camera").subscribe(res => {
      this.result = res;
      const resParts: string[] = res.split(":");
      if (resParts.length !== 2) {
        return;
      }

      const sessionId = resParts[0];
      const timecode = resParts[1];

      this.dispatchRequest(sessionId, timecode);
    });
  }

  dispatchRequest(sessionId: string, timecode: string) {
    const signInRequest: ISignInRequest = {
      id: "1",
      userId: this.user.id,
      time: new Date().toISOString(),
      deviceInfo: "a",
      sessionId: sessionId,
      timecode: timecode
    };

    const authentication: IBasicAuth = {
      username: this.user.email,
      password: this.auth.token
    };
    this._store.dispatch(
      new SignInAction({ auth: authentication, request: signInRequest })
    );
  }
}
