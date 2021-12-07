import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

// Routing module
import { AuthRoutingModule } from './auth-routing.module';
// Services
import { AuthService } from "./core/services/auth.service";

//Components
import { LoginComponent } from './pages/login/login.component';
import { RegisterAdminComponent } from './pages/register-admin/register-admin.component';
import { RegisterPatientComponent } from './pages/register-patient/register-patient.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { TokenService } from '../core/services/token.service';

@NgModule({
  declarations: [LoginComponent, RegisterAdminComponent, RegisterPatientComponent, HeaderComponent, FooterComponent, LayoutComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ],
  exports: [],
  providers: [
    AuthService,
    TokenService
  ]
})
export class AuthModule { }
