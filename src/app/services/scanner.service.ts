import { from, Observable } from "rxjs";

import { Injectable } from "@angular/core";
import { BrowserQRCodeReader } from "@zxing/library/esm5/browser/BrowserQRCodeReader";

@Injectable({
  providedIn: "root"
})
export class ScannerService {
  private reader: BrowserQRCodeReader;

  constructor() {
    this.reader = new BrowserQRCodeReader();
  }

  scan(videoId: string): Observable<string> {
    return from(
      this.reader
        .decodeFromInputVideoDevice(undefined, videoId)
        .then(result => result.getText())
    );
  }
}
