import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NombreTestPipe } from './pipes/nombre-test.pipe';
import { PsicNombrePipe } from './pipes/psic-nombre.pipe';
import { NivelAnsiedadPipe } from './pipes/nivel-ansiedad.pipe';
import { FiltroPacientePipe } from './pipes/filtro-paciente.pipe';







@NgModule({
  declarations: [
    NombreTestPipe,
    PsicNombrePipe,
    NivelAnsiedadPipe,
    FiltroPacientePipe
  ],
  exports: [
    CommonModule,
    NombreTestPipe,
    PsicNombrePipe,
    NivelAnsiedadPipe,
    FiltroPacientePipe
  ],
  imports: [
    CommonModule,
  ]
})
export class SharedModule { }