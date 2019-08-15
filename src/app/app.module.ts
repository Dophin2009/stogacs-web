import { environment } from "src/environments/environment";

import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { EffectsModule } from "@ngrx/effects";
import { MetaReducer, StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LandingComponent } from "./components/landing/landing.component";
import { LoginComponent } from "./components/login/login.component";
import { SignUpComponent } from "./components/sign-up/sign-up.component";
import { ModalModule } from "./modal/modal.module";
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
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ModalModule,
    EffectsModule.forRoot([AuthEffects, UserEffects]),
    StoreModule.forRoot(appReducers, { metaReducers }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
