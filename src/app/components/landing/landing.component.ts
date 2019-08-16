import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";

import { ModalService } from "../../components/modal/modal.service";
import { IAuthToken } from "../../models/auth.interface";
import { IUser } from "../../models/user.interface";
import { LogoutAction } from "../../store/actions/auth.actions";
import { GetUserAction } from "../../store/actions/user.actions";
import { selectAuth } from "../../store/selectors/auth.selectors";
import { selectUser } from "../../store/selectors/user.selectors";
import { IAppState } from "../../store/state/app.state";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.scss", "../shared.styles.scss"]
})
export class LandingComponent implements OnInit {
  authToken: IAuthToken;
  user: IUser;

  constructor(
    private _store: Store<IAppState>,
    private _modalService: ModalService
  ) {}

  ngOnInit() {
    this._store.select(selectAuth).subscribe(authToken => {
      this.authToken = authToken;
    });

    this._store.select(selectUser).subscribe(user => {
      this.user = user;
    });

    if (this.authToken != null) {
      this._store.dispatch(
        new GetUserAction({
          username: this.authToken.email,
          password: this.authToken.token
        })
      );
    }
  }

  openModal(id: string) {
    this._modalService.open(id);
  }

  closeModal(id: string) {
    this._modalService.close(id);
  }

  dispatchLogout() {
    this._store.dispatch(new LogoutAction());
  }
}
