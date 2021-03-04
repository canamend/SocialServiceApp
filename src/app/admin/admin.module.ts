import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainComponent } from './pages/main/main.component';
import { SetTestComponent } from './pages/set-test/set-test.component';
import { InfoPatientComponent } from './pages/info-patient/info-patient.component';
import { LayoutComponent } from './layout/layout/layout.component';



@NgModule({
  declarations: [NavbarComponent, MainComponent, SetTestComponent, InfoPatientComponent, LayoutComponent],
  imports: [
    CommonModule
  ],
  exports:[LayoutComponent]
})
export class AdminModule { }
