import { Component, OnInit } from '@angular/core'; /* s */
import { ActivatedRoute, Router } from '@angular/router';
import {  Historial } from 'src/app/core/models/historial.interface';
import { Admin, Patient } from 'src/app/core/models/users.interface';
import { PatientService } from 'src/app/core/services/patient.service';
import { Test } from 'src/app/core/models/test.interface';
import { AdminService } from 'src/app/core/services/admin.service';
import { AdminAux } from '../../../core/models/admin.interface';
import { HistorialService } from 'src/app/core/services/historial.service';
import { Question} from 'src/app/core/models/test.interface';
import { TestService } from 'src/app/core/services/test.service';


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
  id_test : number;
  questions: Question [];
  con: number = 0;
  factor1: string;
  factor2: string;
  factor3: string;
  factor4: string;
  factor5: string;
  factor6: string;

  constructor(
    private router: Router,
    private patientService: PatientService,
    private adminService: AdminService,
    private historialService: HistorialService,
    private activatedRoute: ActivatedRoute,
    private testService: TestService
  ) { }

  ngOnInit(): void {
    
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id_hist'));
    this.id_test = Number(this.activatedRoute.snapshot.paramMap.get('id_t'));
    console.log(this.id_test);
    this.fetchData();
  }

  async fetchData(){
    try {
      this.isLoading = true;
      this.patient = await this.patientService.getPatient();
      this.historial = await this.historialService.getHistorial(this.patient.id_paciente);
      this.admins = await this.adminService.getAdmins();
      this.test = await this.testService.getTest(this.id_test);
      this.questions = this.test.questions; 
      
      for(let i = 0 ; i < this.questions.length ; i++){
        switch(this.questions[i].tipo_pregunta){
          case 1:
            this.factor1 = this.questions[i].factor;
            break;
          case 2:
            this.factor2 = this.questions[i].factor;
            break;
          case 3:
            this.factor3 = this.questions[i].factor;
            break;
          case 4:
            this.factor4 = this.questions[i].factor;
            break;
          case 5:
            this.factor5 = this.questions[i].factor;
            break;
          case 6:
            this.factor6 = this.questions[i].factor;
            break;
        } 
        //console.log(this.questions[i].factor);
      }
      console.log(this.factor1);
      console.log(this.factor2);
      console.log(this.factor3);
      console.log(this.factor4);
      console.log(this.factor5);
      console.log(this.factor6);
      this.isLoading= false;
    } catch (error) {
      this.isLoading= false;
      this.router.navigate(['/auth/login']);
    }
  }
}

