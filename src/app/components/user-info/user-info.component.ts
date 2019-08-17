import { ISignInRequest, IUser } from "src/app/models/user.interface";
import { GetSignInRequestsAction } from "src/app/store/actions/user.actions";
import {
  selectSignInRequests,
  selectUser
} from "src/app/store/selectors/user.selectors";
import { IAppState } from "src/app/store/state/app.state";

import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-user-info",
  templateUrl: "./user-info.component.html",
  styleUrls: ["./user-info.component.scss"]
})
export class UserInfoComponent implements OnInit {
  user: IUser;
  signInRequests: ISignInRequest[];

  constructor(private _store: Store<IAppState>) {}

  ngOnInit() {
    this._store.select(selectUser).subscribe(user => {
      this.user = user;
    });

    this._store.select(selectSignInRequests).subscribe(signInRequests => {
      this.signInRequests = signInRequests;
    });

    this._store.dispatch(new GetSignInRequestsAction());
  }

  openRequestDetails(requestId: string) {}
}
