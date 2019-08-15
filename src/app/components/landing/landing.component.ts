import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";

import { IAppState } from "../../store/state/app.state";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(private store: Store<IAppState>) { }

  ngOnInit() {
  }

}
