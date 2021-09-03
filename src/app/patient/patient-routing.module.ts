import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { HomePatientComponent } from './pages/home-patient/home-patient.component';
import { LayoutComponent } from "./layout/layout/layout.component";
import { TestComponent } from './pages/test/test.component';


const routes: Routes = [
  // auth/login
  { path: '', component: LayoutComponent,
    children: [
      { path: 'home', component: HomePatientComponent},                      /*  /patient/home */
      { path: 'test/:id_test', component: TestComponent},                      /*  /patient/test */
      { path: '**', pathMatch: 'full', redirectTo: 'home' }
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
export class PatientRoutingModule { }
