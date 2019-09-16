import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatOptionModule,
  MatToolbarModule,
  MatTooltipModule
} from "@angular/material";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ServiceWorkerModule } from "@angular/service-worker";
import { EffectsModule } from "@ngrx/effects";
import { MetaReducer, StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { ZXingScannerModule } from "@zxing/ngx-scanner";

import { environment } from "../environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LandingComponent } from "./components/landing/landing.component";
import { LoginComponent } from "./components/login/login.component";
import { ScannerComponent } from "./components/scanner/scanner.component";
import { SignUpComponent } from "./components/sign-up/sign-up.component";
import { UserInfoComponent } from "./components/user-info/user-info.component";
import { AuthEffects } from "./store/effects/auth.effects";
import { UserEffects } from "./store/effects/user.effects";
import { appReducers, storageSyncReducer } from "./store/reducers/app.reducers";
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { MeetingsEffects } from './store/effects';
import { QrCodeComponent } from './components/qr-code/qr-code.component';
const metaReducers: Array<MetaReducer<any, any>> = [storageSyncReducer];

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LoginComponent,
    SignUpComponent,
    ScannerComponent,
    UserInfoComponent,
    AdminDashboardComponent,
    QrCodeComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatOptionModule,
    MatToolbarModule,
    MatTooltipModule,
    ReactiveFormsModule,
    ZXingScannerModule,
    EffectsModule.forRoot([AuthEffects, UserEffects, MeetingsEffects]),
    StoreModule.forRoot(appReducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent, SignUpComponent, ScannerComponent]
})
export class AppModule {}
