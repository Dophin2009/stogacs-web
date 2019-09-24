import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { Store } from "@ngrx/store";
import { BarcodeFormat } from "@zxing/library/esm5";
import { ZXingScannerComponent } from "@zxing/ngx-scanner";

import { IAuthToken } from "../../models/auth.interface";
import { IUser } from "../../models/user.interface";
import { SignInAction } from "../../store/actions/user.actions";
import { selectAuthToken } from "../../store/selectors/auth.selectors";
import { selectUser } from "../../store/selectors/user.selectors";
import { IAppState } from "../../store/state/app.state";
import { ISignInRequest } from 'src/app/models/meeting.interface';

@Component({
  selector: "app-scanner",
  templateUrl: "./scanner.component.html",
  styleUrls: ["./scanner.component.scss"]
})
export class ScannerComponent implements OnInit {
  @ViewChild(ZXingScannerComponent, { static: false })
  scanner: ZXingScannerComponent;
  allowedFormats = [BarcodeFormat.QR_CODE];
  availableCameras: MediaDeviceInfo[] = [];
  lastScan: string;

  user: IUser;
  auth: IAuthToken;

  constructor(
    private _store: Store<IAppState>,
    private _dialogRef: MatDialogRef<ScannerComponent>
  ) {}

  ngOnInit() {
    this._store.select(selectAuthToken).subscribe(auth => {
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
      time: 0,
      deviceInfo: "a",
      sessionId: sessionId,
      timecode: timecode
    };

    this._store.dispatch(new SignInAction(signInRequest));
    this._dialogRef.close();
  }

  setCamera(camera: MediaDeviceInfo) {
    this.scanner.device = camera;
  }

  setAvailableCameras(cameras: MediaDeviceInfo[]) {
    this.availableCameras = cameras;
    // this.scanner.device = cameras[0];
  }

  close() {
    this._dialogRef.close();
  }
}
