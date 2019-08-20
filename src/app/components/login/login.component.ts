import { selectLoginStateNotifier } from "src/app/store/selectors/auth.selectors";
import { LoginStateNotifier } from "src/app/store/state/auth.state";

import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { MatDialogRef, MatIconRegistry } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";
import { Store } from "@ngrx/store";

import { IBasicAuth } from "../../models/auth.interface";
import {
  ClearLoginStateNotifier,
  Login
} from "../../store/actions/auth.actions";
import { IAppState } from "../../store/state/app.state";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  form: FormGroup;

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
      _sanitizer.bypassSecurityTrustResourceUrl("asset/error.svg")
    );
  }

  ngOnInit() {
    this._store
      .select(selectLoginStateNotifier)
      .subscribe((loginStateNotifier: LoginStateNotifier) => {
        this.loginStateNotifier = loginStateNotifier;
      });

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
    this._store.dispatch(new ClearLoginStateNotifier());
    this._dialogRef.close();
  }

  loginPending() {
    return this.loginStateNotifier === LoginStateNotifier.PENDING;
  }

  loginSuccess() {
    return this.loginStateNotifier === LoginStateNotifier.SUCCESS;
  }

  loginFailure() {
    return this.loginStateNotifier === LoginStateNotifier.FAILURE;
  }

  get email() {
    return this.form.get("email");
  }

  get password() {
    return this.form.get("password");
  }
}
