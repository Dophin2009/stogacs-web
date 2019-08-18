import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Store } from "@ngrx/store";

import {
  ISignInRequest,
  ISignInSession,
  IUser
} from "../../models/user.interface";
import {
  ClearCurrentSignInSessionAction,
  GetSignInRequestsAction,
  GetSignInSessionAction
} from "../../store/actions/user.actions";
import {
  selectCurrentSignInSession,
  selectSignInRequests,
  selectUser
} from "../../store/selectors/user.selectors";
import { IAppState } from "../../store/state/app.state";

@Component({
  selector: "app-user-info",
  templateUrl: "./user-info.component.html",
  styleUrls: ["./user-info.component.scss"]
})
export class UserInfoComponent implements OnInit {
  user: IUser;
  signInRequests: ISignInRequest[];
  currentSignInSession: ISignInSession;

  constructor(private _store: Store<IAppState>) {}

  ngOnInit() {
    this._store.select(selectUser).subscribe(user => {
      this.user = user;
    });

    this._store.select(selectSignInRequests).subscribe(signInRequests => {
      this.signInRequests = signInRequests;
    });

    this._store.select(selectCurrentSignInSession).subscribe(signInSession => {
      this.currentSignInSession = signInSession;
    });

    this._store.dispatch(new GetSignInRequestsAction());
  }

  getRequestSession(sessionId: string) {
    this._store.dispatch(new GetSignInSessionAction(sessionId));
  }

  clearCurrentSession() {
    this._store.dispatch(new ClearCurrentSignInSessionAction());
  }

  formatISODate(s: string): string {
    return new Date(s + "Z").toLocaleString();
  }
}
