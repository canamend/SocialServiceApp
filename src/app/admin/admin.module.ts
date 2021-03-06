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
import { ResultadosComponent } from './pages/resultados/resultados.component';
import { MaterialModule } from '../material/material.module';
import { TiposRespuestaComponent } from './components/tipos-respuesta/tipos-respuesta.component';
import { RespuestaFormComponent } from './components/respuesta-form/respuesta-form.component';
import { PreguntaFormComponent } from './components/pregunta-form/pregunta-form.component';

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
    ResultadosComponent,
    TiposRespuestaComponent,
    RespuestaFormComponent,
    PreguntaFormComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    MaterialModule
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
