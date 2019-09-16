import { Component, OnInit } from '@angular/core';
import { ISignInSession, ISignInSessionCode } from 'src/app/models/meeting.interface';
import { selectCurrentSession } from 'src/app/store/selectors';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/state';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss']
})
export class QrCodeComponent implements OnInit {

  form: FormGroup;

  currentSignInSession: ISignInSession;
  
  currentQrCode: Blob;

  constructor(private _fb: FormBuilder, private _store: Store<IAppState>) { }

  ngOnInit() {
    this.form = this._fb.group({
      qrCode: [null, Validators.required]
    });

    this._store.select(selectCurrentSession).subscribe(signInSession => {
      this.currentSignInSession = signInSession;
    });

    this.form.controls.session.valueChanges.subscribe((qrCode: ISignInSessionCode) => {
      // this._store.dispatch(new GetSessionQrCodeImageRequestAction(sessionId, qrCode));
    })

  }

  cycleQrCode() {

  }

}
