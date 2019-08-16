import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { MatDialogRef } from "@angular/material";
import { Store } from "@ngrx/store";

import { IBasicAuth } from "../../models/auth.interface";
import { Login } from "../../store/actions/auth.actions";
import { IAppState } from "../../store/state/app.state";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private _store: Store<IAppState>,
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<LoginComponent>
  ) {}

  ngOnInit() {
    this.form = this._fb.group({
      email: [
        null,
        Validators.compose([Validators.required, Validators.email])
      ],
      password: [null, [Validators.required]]
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    const formValues = this.form.value;
    const credentials: IBasicAuth = {
      username: formValues.email.trim(),
      password: formValues.password.trim()
    };
    this._store.dispatch(new Login(credentials));
  }

  close() {
    this._dialogRef.close();
  }

  get email() {
    return this.form.get("email");
  }

  get password() {
    return this.form.get("password");
  }
}
