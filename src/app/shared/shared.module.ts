import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NombreTestPipe } from './pipes/nombre-test.pipe';
import { PsicNombrePipe } from './pipes/psic-nombre.pipe';







@NgModule({
  declarations: [
    NombreTestPipe,
    PsicNombrePipe
  ],
  exports: [
    CommonModule,
    NombreTestPipe,
    PsicNombrePipe
  ],
  imports: [
    CommonModule,
  ]
})
export class SharedModule { }