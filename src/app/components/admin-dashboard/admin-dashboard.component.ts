import { Component, OnInit, Input } from '@angular/core';
import { IMeeting, ISignInSession } from 'src/app/models/meeting.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/state';
import { UpdateCurrentMeetingRequestAction, UpdateCurrentSessionRequestAction, GetMeetingSessionsRequestAction } from 'src/app/store/actions';
import { selectMeetingSessions, selectCurrentMeeting, selectCurrentSignInSession } from 'src/app/store/selectors';
import { single } from 'rxjs/operators';
import { MatDialog } from "@angular/material/dialog";
import { QrCodeComponent } from "../qr-code/qr-code.component";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  form: FormGroup;

  @Input()
  meetings: IMeeting[];

  currentMeeting: IMeeting;

  currentMeetingSesions: ISignInSession[];

  currentSignInSession: ISignInSession = null;
  
  constructor(  private _fb: FormBuilder, private _store: Store<IAppState>, private dialog: MatDialog ) { }

  ngOnInit() {
    this.form = this._fb.group({
      meeting: [null, Validators.required],
      session: [null, Validators.required]
    });

    this.form.controls.meeting.valueChanges.subscribe((meeting: IMeeting) => {
      this._store.dispatch(new UpdateCurrentMeetingRequestAction(meeting));
      this._store.dispatch(new GetMeetingSessionsRequestAction(meeting.id));
    })

    this.form.controls.session.valueChanges.subscribe((session: ISignInSession) => {
      this._store.dispatch(new UpdateCurrentSessionRequestAction(session));
    })

    this._store.select(selectCurrentMeeting).subscribe(meeting => {
      this.currentMeeting = meeting;
    });

    this._store.select(selectMeetingSessions).subscribe(meetingSessions => {
      this.currentMeetingSesions = meetingSessions;
    });

    this._store.select(selectCurrentSignInSession).subscribe(signInSession => {
      console.log("signInSession:" + signInSession);
      this.currentSignInSession = signInSession;
    });

  }


  openShowBarCode() {
    this.dialog.open(QrCodeComponent, {
      height: "80%",
      minHeight: "500px",
      maxHeight: "700px",
      width: "80%",
      minWidth: "500px",
      maxWidth: "650px",
      autoFocus: true
    });
  }

  disableShowQrCode() {
    return this.currentSignInSession === null;
  }
}
