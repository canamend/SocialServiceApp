import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterAdminComponent } from './pages/register-admin/register-admin.component';
import { RegisterPatientComponent } from './pages/register-patient/register-patient.component';

const routes: Routes = [
  // auth/login
  { path: '', component: LayoutComponent,
    children: [
      { path: 'login', component: LoginComponent},                      /*  /auth/login */
      { path: 'registeradmin', component: RegisterAdminComponent},      /*  /auth/registeradmin */
      { path: 'registerpatient', component: RegisterPatientComponent},  /*  /auth/registerpatient */
      { path: '**', pathMatch: 'full', redirectTo: 'login' }
    ]
  },
]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule { }
