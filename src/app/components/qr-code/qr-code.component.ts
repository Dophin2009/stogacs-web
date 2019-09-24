import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  ISignInSession,
  ISignInSessionCode
} from "src/app/models/meeting.interface";
import {
  selectCurrentSession,
  selectMeetingError
} from "src/app/store/selectors";
import { Store } from "@ngrx/store";
import { IAppState } from "src/app/store/state";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  RecycleSessionQrCodeRequestAction,
  RecycleSessionQrCodeSuccessAction
} from "src/app/store/actions";
import {
  selectCurrentQrCode,
  selectCycleSessionCode,
  selectCurrentQrCodeImage
} from "src/app/store/selectors";
import { DomSanitizer } from "@angular/platform-browser";
import { QrCodeService } from "src/app/services";

@Component({
  selector: "app-qr-code",
  templateUrl: "./qr-code.component.html",
  styleUrls: ["./qr-code.component.scss"]
})
export class QrCodeComponent implements OnInit, OnDestroy {
  form: FormGroup;

  currentSignInSession: ISignInSession;
  currentSignInSessionCode: ISignInSessionCode;
  currentQrCode: string;
  cycleSessionCode: ISignInSessionCode;
  currentQrCodeImage: any;
  currentQrCodeImageUrl: any;
  timerId: any;
  error: any;

  isRecycling: boolean = false;

  constructor(
    private qrCodeService: QrCodeService,
    private _fb: FormBuilder,
    private _store: Store<IAppState>,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.form = this._fb.group({
      qrCode: [null, Validators.required]
    });

    this._store.select(selectCurrentSession).subscribe(signInSession => {
      this.currentSignInSession = signInSession;
    });

    this._store.select(selectCurrentQrCode).subscribe(qrCode => {
      if (qrCode) {
        this.currentQrCode = qrCode;
        this.qrCodeService
          .getSessionQrCodeImage(
            this.currentSignInSession.id,
            this.currentQrCode
          )
          .subscribe(data => {
            this.currentQrCodeImage = data;
            let objectURL = window.URL.createObjectURL(this.currentQrCodeImage);
            this.currentQrCodeImageUrl = this.sanitizer.bypassSecurityTrustUrl(
              objectURL
            );
          });
      }
    });

    this._store.select(selectCycleSessionCode).subscribe(sessionCode => {
      if (sessionCode) {
        this.cycleSessionCode = sessionCode;
        this.qrCodeService
          .getSessionQrCodeImage(
            this.currentSignInSession.id,
            this.cycleSessionCode.code
          )
          .subscribe(data => {
            this.currentQrCodeImage = data;
            let objectURL = window.URL.createObjectURL(this.currentQrCodeImage);
            this.currentQrCodeImageUrl = this.sanitizer.bypassSecurityTrustUrl(
              objectURL
            );
          });

        // clear old time first.
        this.clearTimer();

        // start timer
        if (!this.timerId) {
          this.timerId = setInterval(
            (signInSessionCode: ISignInSessionCode) => {
              this._store.dispatch(
                new RecycleSessionQrCodeRequestAction(
                  this.currentSignInSession.id
                )
              );
            },
            this.cycleSessionCode.endsIn * 1000,
            this.cycleSessionCode
          );
        }
      }
    });

    this.form.controls.qrCode.valueChanges.subscribe(
      (sessionCode: ISignInSessionCode) => {
        this.error = null;
        this.currentSignInSessionCode = sessionCode;
        this.qrCodeService
          .getSessionQrCodeImage(this.currentSignInSession.id, sessionCode.code)
          .subscribe(data => {
            this.currentQrCodeImage = data;
            let objectURL = window.URL.createObjectURL(this.currentQrCodeImage);
            this.currentQrCodeImageUrl = this.sanitizer.bypassSecurityTrustUrl(
              objectURL
            );
          });
      }
    );

    // error
    this._store.select(selectMeetingError).subscribe(error => {
      this.error = error;
      this.isRecycling = false;
    });
  }

  // start/stop qr code cycling.
  cyclingQrCode() {
    if (!this.isRecycling) {
      this._store.dispatch(
        new RecycleSessionQrCodeRequestAction(this.currentSignInSession.id)
      );
    } else {
      this.clearTimer();
      if (this.cycleSessionCode) {
        this._store.dispatch(new RecycleSessionQrCodeSuccessAction(null));
      }

    }

    // toggle recycling.
    this.isRecycling = !this.isRecycling;
  }

  // get meeting error message
  getMeetingErrorMessage() {
    let message = null;
    if (this.error) {
      return this.error.error.message;
    }
    return message;
  }

  // clear current timer
  clearTimer() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  // clear timer when component is destroyed.
  ngOnDestroy() {
    this.clearTimer();
  }
}
