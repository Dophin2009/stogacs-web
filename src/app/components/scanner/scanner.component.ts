import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { Store } from "@ngrx/store";
import { ZXingScannerComponent } from "@zxing/ngx-scanner";

import { IAuthToken, IBasicAuth } from "../../models/auth.interface";
import { ISignInRequest, IUser } from "../../models/user.interface";
import { SignInAction } from "../../store/actions/user.actions";
import { selectAuth } from "../../store/selectors/auth.selectors";
import { selectUser } from "../../store/selectors/user.selectors";
import { IAppState } from "../../store/state/app.state";

@Component({
  selector: "app-scanner",
  templateUrl: "./scanner.component.html",
  styleUrls: ["./scanner.component.scss"]
})
export class ScannerComponent implements OnInit {
  @ViewChild(ZXingScannerComponent, { static: false })
  scanner: ZXingScannerComponent;
  availableCameras: MediaDeviceInfo[];
  lastScan: string;

  user: IUser;
  auth: IAuthToken;

  constructor(
    private _store: Store<IAppState>,
    private _dialogRef: MatDialogRef<ScannerComponent>
  ) {}

  ngOnInit() {
    this._store.select(selectAuth).subscribe(auth => {
      this.auth = auth;
    });
    this._store.select(selectUser).subscribe(user => {
      this.user = user;
    });
  }

  handleScan(result: string) {
    if (result === this.lastScan) {
      return;
    }

    this.lastScan = result;
    const resParts: string[] = result.split(":");
    if (resParts.length !== 2) {
      return;
    }
    const sessionId = resParts[0];
    const timecode = resParts[1];
    this.dispatchRequest(sessionId, timecode);
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

  setCamera(camera: MediaDeviceInfo) {
    this.scanner.device = camera;
  }

  setAvailableCameras(cameras: MediaDeviceInfo[]) {
    this.availableCameras = cameras;
  }

  close() {
    this._dialogRef.close();
  }
}
