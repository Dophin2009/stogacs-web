import { Observable } from "rxjs";

import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";

import { IRegistration } from "../../models/auth.interface";
import { Register } from "../../store/actions/auth.actions";
import { IAppState } from "../../store/state/app.state";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"]
})
export class SignUpComponent implements OnInit {
  firstName: string;
  lastName: string;
  email: string;
  grade: number;
  password: string;
  matchingPassword: string;

  constructor(private _store: Store<IAppState>) {}

  ngOnInit() {}

  onSubmit() {
    const payload: IRegistration = {
      name: `${this.firstName.trim()} ${this.lastName.trim()}`,
      email: this.email,
      grade: this.grade,
      password: this.password,
      matchingPassword: this.matchingPassword
    };
    this._store.dispatch(new Register(payload));
  }
}
