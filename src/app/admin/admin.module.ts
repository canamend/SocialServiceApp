import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from "./admin-routing.module";
// Services
import { AdminService } from "../core/services/admin.service";
import { PatientService } from "../core/services/patient.service";

import { NavbarComponent } from './components/navbar/navbar.component';
import { MainComponent } from './pages/main/main.component';
import { SetTestComponent } from './pages/set-test/set-test.component';
import { InfoPatientComponent } from './pages/info-patient/info-patient.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { LoadingOverlayComponent } from "../shared/components/loading-overlay/loading-overlay.component";

// pipes
import { AvatarPatientPipe } from '../shared/pipes/avatar-patient.pipe';
import { AddExpedienteComponent } from './components/add-expediente/add-expediente.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    NavbarComponent, 
    MainComponent, 
    SetTestComponent, 
    InfoPatientComponent, 
    LayoutComponent,
    LoadingOverlayComponent,
    AvatarPatientPipe,
    AddExpedienteComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ],
  providers: [
    AdminService,
    PatientService
  ],
  exports:[LayoutComponent]
})
export class AdminModule { }
