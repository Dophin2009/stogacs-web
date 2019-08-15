import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LandingComponent } from "./components/landing/landing.component";
import { ScannerComponent } from "./components/scanner/scanner.component";

const routes: Routes = [
  { path: "scan", component: ScannerComponent },
  { path: "", component: LandingComponent },
  { path: "**", redirectTo: "/" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
