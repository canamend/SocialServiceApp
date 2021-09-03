import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminAux } from 'src/app/core/models/admin.interface';
import { Carer } from 'src/app/core/models/carer.interface';
import { Historial } from 'src/app/core/models/historial.interface';
import {  Patient } from 'src/app/core/models/users.interface';
import { AdminService } from 'src/app/core/services/admin.service';
import { HistorialService } from 'src/app/core/services/historial.service';
import { PatientService } from 'src/app/core/services/patient.service';

@Component({
  selector: 'app-info-patient',
  templateUrl: './info-patient.component.html',
  styleUrls: ['./info-patient.component.css']
})
export class InfoPatientComponent implements OnInit {
  patient: Patient;
  carer: Carer;
  isLoading: boolean;
  historial: Historial[];
  admins: AdminAux[]; 
  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private router: Router,
    private historialService: HistorialService,
    private adminService: AdminService
  ) { 
    this.isLoading = true;
  }

  ngOnInit(): void {
    const username = this.route.snapshot.params['username'];
    this.fetchData(username);
  }
  async fetchData(username: string){
    try {
      this.patient = await this.patientService.getPatient(username);    
      this.carer = await this.patientService.getCarer(this.patient.id_cuidador);
      this.historial = await this.historialService.getHistorial(this.patient.id_paciente);
      this.admins = await this.adminService.getAdmins();
      this.isLoading = false;
    } catch (error) {
      this.router.navigate(['admin/home']);
    }
  }

}
