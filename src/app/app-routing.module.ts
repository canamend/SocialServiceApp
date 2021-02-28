import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Components
import { LoginComponent } from './auth/pages/login/login.component';
import { RegisterAdminComponent } from './auth/pages/register-admin/register-admin.component';
import { RegisterPatientComponent } from './auth/pages/register-patient/register-patient.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent}, 
  { path: 'registeradmin', component: RegisterAdminComponent}, 
  { path: 'registerpatient', component: RegisterPatientComponent}, 
  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
