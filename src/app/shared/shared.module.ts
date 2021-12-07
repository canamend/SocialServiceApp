import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NombreTestPipe } from './pipes/nombre-test.pipe';
import { PsicNombrePipe } from './pipes/psic-nombre.pipe';
import { NivelAnsiedadPipe } from './pipes/nivel-ansiedad.pipe';
import { FiltroPacientePipe } from './pipes/filtro-paciente.pipe';
import { AvatarPatientPipe } from './pipes/avatar-patient.pipe';







@NgModule({
  declarations: [
    NombreTestPipe,
    PsicNombrePipe,
    NivelAnsiedadPipe,
    FiltroPacientePipe,
    AvatarPatientPipe
  ],
  exports: [
    CommonModule,
    NombreTestPipe,
    PsicNombrePipe,
    NivelAnsiedadPipe,
    FiltroPacientePipe,
    AvatarPatientPipe
  ],
  imports: [
    CommonModule,
  ]
})
export class SharedModule { }