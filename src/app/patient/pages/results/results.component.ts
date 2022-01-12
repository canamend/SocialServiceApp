import { Component, OnInit } from '@angular/core'; /* s */
import { ActivatedRoute, Router } from '@angular/router';
import {  Historial } from 'src/app/core/models/historial.interface';
import { Admin, Patient } from 'src/app/core/models/users.interface';
import { PatientService } from 'src/app/core/services/patient.service';
import { Test } from 'src/app/core/models/test.interface';
import { AdminService } from 'src/app/core/services/admin.service';
import { AdminAux } from '../../../core/models/admin.interface';
import { HistorialService } from 'src/app/core/services/historial.service'; 

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  patient: Patient;
  isLoading: boolean;
  test: Test;
  admins: AdminAux[]; 
  historial: Historial[];
  id: number;

  constructor(
    private router: Router,
    private patientService: PatientService,
    private adminService: AdminService,
    private historialService: HistorialService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.fetchData();
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id_hist'));
  }

  async fetchData(){
    try {
      this.isLoading = true;
      this.patient = await this.patientService.getPatient();
      this.historial = await this.historialService.getHistorial(this.patient.id_paciente);
      this.admins = await this.adminService.getAdmins();
      this.isLoading= false;
      
    } catch (error) {
      this.isLoading= false;
      this.router.navigate(['/auth/login']);
    }
  }
}

