import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: 'auth' ,
    loadChildren: ()=> import('./auth/auth.module').then(m => m.AuthModule)
  },
  { path: 'admin', 
    canActivate: [AuthGuard],
    data: { role: 'admin_rol'},
    loadChildren: ()=>import('./admin/admin.module').then( m => m.AdminModule)
  },
  { path: 'patient', 
    canActivate: [AuthGuard],
    data: { role: 'paciente_rol'},
    loadChildren: ()=>import('./patient/patient.module').then( m => m.PatientModule)
  },
  { path:'', pathMatch: 'full', redirectTo: 'auth'},
  { path: '**', pathMatch: 'full', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
