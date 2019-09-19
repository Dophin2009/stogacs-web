import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap, switchMap, take } from "rxjs/operators";
import { QrCodeService} from '../../services';
import { ISignInSessionCode} from 'src/app/models/meeting.interface';

import { EMeetingsActions, GetSessionQrCodeImageFailureAction, GetSessionQrCodeImageRequestAction, 
  GetSessionQrCodeImageSuccessAction, RecycleSessionQrCodeRequestAction, RecycleSessionQrCodeSuccessAction, RecycleSessionQrCodeFailureAction } from '../actions';

@Injectable()
export class QrCodeEffects {
  constructor(
    private _qrCodeService: QrCodeService,
    private _actions$: Actions,
    private _router: Router
  ) {}

  @Effect()
  getQrCodeImage$ = this._actions$.pipe(
    ofType(EMeetingsActions.GetSessionsQrCodeImageRequest),
    switchMap((action) => {
      const data = (action as GetSessionQrCodeImageRequestAction).payload;
      return this._qrCodeService.getSessionQrCodeImage(data.sessionId, data.qrCode).pipe(
        map((response: Blob) => {
            console.log("in qrcode effect, response blob:" + response);
            return new GetSessionQrCodeImageSuccessAction(response);
          
        }),
        catchError(error => of(new GetSessionQrCodeImageFailureAction(error)))
      );
    })
  );

  @Effect()
  getCurrentSessionQrCode$ = this._actions$.pipe(
    ofType(EMeetingsActions.RecyleSessionsQrCodeRequest),
    switchMap((action) => {
      return this._qrCodeService.recycleSessionQrCode((action as RecycleSessionQrCodeRequestAction).payload).pipe(
        map((response: ISignInSessionCode) => {
          console.log("effect qrcode response code:" + response.code);
          if(response) {
            return new RecycleSessionQrCodeSuccessAction(response);
          }
        }),
        catchError(error => of(new RecycleSessionQrCodeFailureAction(error)))
      );
    })

  );

}
