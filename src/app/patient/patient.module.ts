import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { SharedModule } from '../shared/shared.module';
// Componentes
import { HeaderPatientComponent } from './components/header-patient/header-patient.component';
import { HomePatientComponent } from './pages/home-patient/home-patient.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { TestComponent } from './pages/test/test.component';
import { ResultsComponent } from './pages/results/results.component';

import { AvatarPatientPipe } from '../shared/pipes/avatar-patient.pipe';


@NgModule({
  declarations: [
    HeaderPatientComponent, 
    HomePatientComponent, 
    LayoutComponent, 
    TestComponent,
    ResultsComponent
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    SharedModule
  ],
  providers:[
    AvatarPatientPipe
  ],
  exports:[LayoutComponent]
})
export class PatientModule { }
