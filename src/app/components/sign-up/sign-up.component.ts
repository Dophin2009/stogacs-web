import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material";
import { Store } from "@ngrx/store";

import { IRegistration } from "../../models/auth.interface";
import { Register } from "../../store/actions/auth.actions";
import { IAppState } from "../../store/state/app.state";
import { LoginComponent } from "../login/login.component";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"]
})
export class SignUpComponent implements OnInit {
  form: FormGroup;

  constructor(
    private _store: Store<IAppState>,
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<LoginComponent>
  ) {}

  ngOnInit() {
    this.form = this._fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [
        null,
        Validators.compose([Validators.required, Validators.email])
      ],
      grade: [
        null,
        Validators.compose([
          Validators.required,
          Validators.min(8),
          Validators.max(13)
        ])
      ],
      password: [null, Validators.required],
      matchingPassword: [null, Validators.required]
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    const formValues = this.form.value;
    const payload: IRegistration = {
      name: `${formValues.firstName.trim()} ${formValues.lastName.trim()}`,
      email: formValues.email.trim(),
      grade: formValues.grade,
      password: formValues.password.trim(),
      matchingPassword: formValues.matchingPassword.trim()
    };
    this._store.dispatch(new Register(payload));
  }

  close() {
    this._dialogRef.close();
  }

  get firstName() {
    return this.form.get("firstName");
  }

  get lastName() {
    return this.form.get("lastName");
  }

  get email() {
    return this.form.get("email");
  }

  get grade() {
    return this.form.get("grade");
  }

  get password() {
    return this.form.get("password");
  }

  get matchingPassword() {
    return this.form.get("matchingPassword");
  }
}
