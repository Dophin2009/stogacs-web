import { Observable } from "rxjs";

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
  styleUrls: ["./landing.component.scss"]
})
export class LandingComponent implements OnInit {
  authToken: Observable<IAuthToken> = this._store.select(selectAuth);
  user: Observable<IUser> = this._store.select(selectUser);

  constructor(
    private _store: Store<IAppState>,
    private _modalService: ModalService
  ) {}

  ngOnInit() {
    this.authToken.subscribe((token: IAuthToken) => {
      if (token != null) {
        this._store.dispatch(
          new GetUserAction({ username: token.email, password: token.token })
        );
      }
    });
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
