import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NombreTestPipe } from './pipes/nombre-test.pipe';
import { PsicNombrePipe } from './pipes/psic-nombre.pipe';
import { NivelAnsiedadPipe } from './pipes/nivel-ansiedad.pipe';







@NgModule({
  declarations: [
    NombreTestPipe,
    PsicNombrePipe,
    NivelAnsiedadPipe
  ],
  exports: [
    CommonModule,
    NombreTestPipe,
    PsicNombrePipe,
    NivelAnsiedadPipe
  ],
  imports: [
    CommonModule,
  ]
})
export class SharedModule { }