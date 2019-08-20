import {
  selectLoginStateNotifier,
  selectRegistrationStateNotifier
} from "src/app/store/selectors/auth.selectors";
import {
  LoginStateNotifier,
  RegistrationStateNotifier
} from "src/app/store/state/auth.state";

import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MatIconRegistry } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";
import { Store } from "@ngrx/store";

import { IRegistration } from "../../models/auth.interface";
import {
  ClearRegistrationStateAction,
  Register
} from "../../store/actions/auth.actions";
import { IAppState } from "../../store/state/app.state";
import { LoginComponent } from "../login/login.component";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"]
})
export class SignUpComponent implements OnInit {
  form: FormGroup;

  registrationStateNotifier: RegistrationStateNotifier;
  loginStateNotifier: LoginStateNotifier;

  constructor(
    private _store: Store<IAppState>,
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<LoginComponent>,
    private _iconRegistry: MatIconRegistry,
    private _sanitizer: DomSanitizer
  ) {
    _iconRegistry.addSvgIcon(
      "done",
      _sanitizer.bypassSecurityTrustResourceUrl("assets/done.svg")
    );

    _iconRegistry.addSvgIcon(
      "failed",
      _sanitizer.bypassSecurityTrustResourceUrl("assets/error.svg")
    );
  }

  ngOnInit() {
    this._store
      .select(selectRegistrationStateNotifier)
      .subscribe((registrationStateNotifier: RegistrationStateNotifier) => {
        this.registrationStateNotifier = registrationStateNotifier;
      });

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
    this._store.dispatch(new ClearRegistrationStateAction());
    this._dialogRef.close();
  }

  registrationPending() {
    return this.registrationStateNotifier === RegistrationStateNotifier.PENDING;
  }

  registrationSuccess() {
    return this.registrationStateNotifier === RegistrationStateNotifier.SUCCESS;
  }

  registrationFailed() {
    return this.registrationStateNotifier === RegistrationStateNotifier.FAILURE;
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
