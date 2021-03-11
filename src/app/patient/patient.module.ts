import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderPatientComponent } from './components/header-patient/header-patient.component';
import { HomePatientComponent } from './pages/home-patient/home-patient.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { PatientRoutingModule } from './patient-routing.module';
import { TestComponent } from './pages/test/test.component';



@NgModule({
  declarations: [HeaderPatientComponent, HomePatientComponent, LayoutComponent, TestComponent],
  imports: [
    CommonModule,
    PatientRoutingModule
  ]
})
export class PatientModule { }