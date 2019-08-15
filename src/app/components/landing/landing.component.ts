import { Observable } from "rxjs";
import { ModalService } from "src/app/modal/modal.service";
import { IAuthToken } from "src/app/models/auth.interface";
import { IUser } from "src/app/models/user.interface";
import { selectUser } from "src/app/store/selectors/user.selectors";

import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";

import { GetUserAction } from "../../store/actions/user.actions";
import { selectAuth } from "../../store/selectors/auth.selectors";
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
}
