import { environment } from "src/environments/environment";

import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MatButtonModule,
  MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule
} from "@angular/material";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { EffectsModule } from "@ngrx/effects";
import { MetaReducer, StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LandingComponent } from "./components/landing/landing.component";
import { LoginComponent } from "./components/login/login.component";
import { ScannerComponent } from "./components/scanner/scanner.component";
import { SignUpComponent } from "./components/sign-up/sign-up.component";
import { AuthEffects } from "./store/effects/auth.effects";
import { UserEffects } from "./store/effects/user.effects";
import { appReducers, storageSyncReducer } from "./store/reducers/app.reducers";

const metaReducers: Array<MetaReducer<any, any>> = [storageSyncReducer];

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LoginComponent,
    SignUpComponent,
    ScannerComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatInputModule,
    ReactiveFormsModule,
    EffectsModule.forRoot([AuthEffects, UserEffects]),
    StoreModule.forRoot(appReducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent, SignUpComponent, ScannerComponent]
})
export class AppModule {}
