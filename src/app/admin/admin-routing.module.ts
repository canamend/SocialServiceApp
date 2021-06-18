import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout/layout/layout.component';
import { InfoPatientComponent } from './pages/info-patient/info-patient.component';
import { MainComponent } from './pages/main/main.component';
import { SetTestComponent } from './pages/set-test/set-test.component';

const routes: Routes = [
  
  { path: '', component: LayoutComponent,
    children: [
      { path: 'home', component: MainComponent },               //  admin/home
      { path: 'settest', component: SetTestComponent },         //  admin/settest
      { path: 'infopatient/:username', component: InfoPatientComponent }, //  admin/infopatient
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
export class AdminRoutingModule { }
