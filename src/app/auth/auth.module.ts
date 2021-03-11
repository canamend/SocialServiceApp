import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Routing module
//Components
import { LoginComponent } from './pages/login/login.component';
import { RegisterAdminComponent } from './pages/register-admin/register-admin.component';
import { RegisterPatientComponent } from './pages/register-patient/register-patient.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LayoutComponent } from './layout/layout/layout.component';

import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [LoginComponent, RegisterAdminComponent, RegisterPatientComponent, HeaderComponent, FooterComponent, LayoutComponent],
  imports: [
    CommonModule,
    AuthRoutingModule
  ],
  exports: []
})
export class AuthModule { }
