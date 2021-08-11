import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Historial } from 'src/app/core/models/historial.interface';
import { Patient } from 'src/app/core/models/users.interface';
import { HistorialService } from 'src/app/core/services/historial.service';
import { PatientService } from 'src/app/core/services/patient.service';

@Component({
  selector: 'app-home-patient',
  templateUrl: './home-patient.component.html',
  styleUrls: ['./home-patient.component.css']
})
export class HomePatientComponent implements OnInit{
  patient: Patient;
  isLoading: boolean;
  historial: Historial[];
  constructor(
    private router: Router,
    private patientService: PatientService
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  async fetchData(){
    try {
      this.isLoading = true;
      this.patient = await this.patientService.getPatient();
      this.isLoading= false;
      
    } catch (error) {
      this.isLoading= false;
      this.router.navigate(['/auth/login']);
    }
  }

  onAnswerTest(){
    this.router.navigate(['/patient/test']);
  }

}
