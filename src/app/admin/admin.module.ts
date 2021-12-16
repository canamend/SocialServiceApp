import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

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
import { InputPatientsComponent } from './components/input-patients/input-patients.component';

// pipes
import { AddExpedienteComponent } from './components/add-expediente/add-expediente.component';
import { AvatarPatientPipe } from '../shared/pipes/avatar-patient.pipe';
import { SharedModule } from '../shared/shared.module';
import { NombreTestPipe } from '../shared/pipes/nombre-test.pipe';
import { CreateTestComponent } from './pages/create-test/create-test.component';
import { EliminarComponent } from './pages/eliminar/eliminar.component';

@NgModule({
  declarations: [
    NavbarComponent, 
    MainComponent, 
    SetTestComponent, 
    InfoPatientComponent, 
    LayoutComponent,
    LoadingOverlayComponent,
    AddExpedienteComponent,
    InputPatientsComponent,
    CreateTestComponent,
    EliminarComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [
    AdminService,
    PatientService,
    NombreTestPipe,
    AvatarPatientPipe
  ],
  exports:[LayoutComponent]
})
export class AdminModule { }
