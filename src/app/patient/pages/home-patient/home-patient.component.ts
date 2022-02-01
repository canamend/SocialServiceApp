import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Historial } from 'src/app/core/models/historial.interface';
import { Admin, Patient } from 'src/app/core/models/users.interface';
import { PatientService } from 'src/app/core/services/patient.service';
import { Test, TestInfo } from 'src/app/core/models/test.interface';
import { AdminService } from 'src/app/core/services/admin.service';
import { AdminAux } from '../../../core/models/admin.interface';
import { HistorialService } from 'src/app/core/services/historial.service';
import { TestService } from '../../../core/services/test.service';

@Component({
  selector: 'app-home-patient',
  templateUrl: './home-patient.component.html',
  styleUrls: ['./home-patient.component.css']
})

export class HomePatientComponent implements OnInit{
  patient: Patient;
  isLoading: boolean;
  testsInfo: TestInfo[];
  admins: AdminAux[]; 
  historial: Historial[];
  
  constructor(
    private router: Router,
    private patientService: PatientService,
    private adminService: AdminService,
    private historialService: HistorialService,
    private testService: TestService
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  async fetchData(){
    try {
      this.isLoading = true;
      this.patient = await this.patientService.getPatient();
      this.historial = await this.historialService.getHistorial(this.patient.id_paciente);
      this.testsInfo = await this.testService.getTestsInfo();    
      this.admins = await this.adminService.getAdmins();
      this.isLoading= false;
      
    } catch (error) {
      this.isLoading= false;
      this.router.navigate(['/auth/login']);
    }
  }

  onAnswerTest(id_test: number, id_historial: number, id_paciente: number){
    this.router.navigate([ `/patient/test/${id_test}` , { id_hist: id_historial, id_pac: id_paciente } ]);
  }

  score(id_test: number, id_historial: number, id_paciente: number){
    this.router.navigate([ `/patient/results/${id_test}` , { id_hist: id_historial, id_pac: id_paciente } ]);
  }
}
