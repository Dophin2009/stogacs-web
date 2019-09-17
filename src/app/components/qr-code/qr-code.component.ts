import { Component, OnInit } from '@angular/core';
import { ISignInSession, ISignInSessionCode } from 'src/app/models/meeting.interface';
import { selectCurrentSession } from 'src/app/store/selectors';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/state';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UpdateSessionQrCodeRequestAction, GetSessionQrCodeImageRequestAction } from 'src/app/store/actions';
import { selectCurrentQrCode, selectCurrentQrCodeImage} from 'src/app/store/selectors';
import { DomSanitizer } from '@angular/platform-browser';
import { QrCodeService} from 'src/app/services'

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss']
})
export class QrCodeComponent implements OnInit {

  form: FormGroup;

  currentSignInSession: ISignInSession;
  currentQrCode: string;
  currentQrCodeImage: any;
  currentQrCodeImageUrl: any;

  constructor(private qrCodeService: QrCodeService, private _fb: FormBuilder, private _store: Store<IAppState>, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.form = this._fb.group({
      qrCode: [null, Validators.required]
    });

    this._store.select(selectCurrentSession).subscribe(signInSession => {
      this.currentSignInSession = signInSession;
    });

    this._store.select(selectCurrentQrCode).subscribe(qrCode => {
      this.currentQrCode = qrCode;
    });

    /*
    this._store.select(selectCurrentQrCodeImage).subscribe(qrCodeImage => {
      this.currentQrCodeImage = qrCodeImage;
      let objectURL = 'data:image/jpeg;base64,' + qrCodeImage;
      this.currentQrCodeImageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
     });
     */

    this.form.controls.qrCode.valueChanges.subscribe((qrCode: ISignInSessionCode) => {
  
      // this._store.dispatch(new UpdateSessionQrCodeRequestAction(qrCode.code));
      // this._store.dispatch(new GetSessionQrCodeImageRequestAction({sessionId: this.currentSignInSession.id, qrCode: qrCode.code}));

      this.qrCodeService.getSessionQrCodeImage(this.currentSignInSession.id, qrCode.code).subscribe( data => {
        this.currentQrCodeImage = data;
        console.log('currentQrCodeImage:' + this.currentQrCodeImage);
        
        let objectURL = window.URL.createObjectURL(this.currentQrCodeImage);
        this.currentQrCodeImageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      }

      );
    

    })

  }

  cycleQrCode() {

  }

}
