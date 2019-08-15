import { ScannerService } from "src/app/services/scanner.service";

import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-scanner",
  templateUrl: "./scanner.component.html",
  styleUrls: ["./scanner.component.scss", "../shared.styles.scss"]
})
export class ScannerComponent implements OnInit {
  result: string;

  constructor(
    private _scannerService: ScannerService,
    private _router: Router
  ) {}

  ngOnInit() {}

  scan() {
    this._scannerService.scan("camera").subscribe(res => {
      this.result = res;
    });
  }
}
