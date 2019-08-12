import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";

import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from "./components/login/login.component";
import { SignUpComponent } from "./components/sign-up/sign-up.component";
import { AuthService } from "./services/auth.service";
import { AuthEffects } from "./store/effects/auth.effects";
import { authReducers } from "./store/reducers/auth.reducers";

@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    EffectsModule.forRoot([AuthEffects]),
    FormsModule,
    HttpClientModule,
    StoreModule.forFeature('auth', authReducers)
  ],
  providers: [AuthService]
})
export class AuthModule { }
