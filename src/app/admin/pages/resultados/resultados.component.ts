import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/core/models/users.interface';
import { PatientService } from 'src/app/core/services/patient.service';
import { ActivatedRoute } from '@angular/router';
import { HistorialService } from 'src/app/core/services/historial.service';
import { Historial } from 'src/app/core/models/historial.interface';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/core/services/admin.service';
import { AdminAux } from 'src/app/core/models/admin.interface';
import { Question} from 'src/app/core/models/test.interface';
import { TestService } from 'src/app/core/services/test.service';
import { Test } from 'src/app/core/models/test.interface';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: []
})
export class ResultadosComponent implements OnInit {
  patient: Patient;
  isLoading: boolean;
  admins: AdminAux[]; 
  historial: Historial[];
  id: number;
  id_t:number;
  nombre: string;
  questions: Question [];
  test: Test;
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
    //nombre del paciente

    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id_hist'));
    this.nombre= String(this.activatedRoute.snapshot.paramMap.get('nom'));
    this.id_t= Number(this.activatedRoute.snapshot.paramMap.get('id_t'));
    console.log(this.id);
    console.log(this.nombre);
    this.fetchData();
  }

  async fetchData(){
    try {
      this.isLoading = true;
      this.patient = await this.patientService.getPatient(this.nombre);
      this.historial = await this.historialService.getHistorial(this.patient.id_paciente);
      this.admins = await this.adminService.getAdmins();
      this.test = await this.testService.getTest(this.id_t);
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
      this.router.navigate(['/admin/home']);
    }
  }
}