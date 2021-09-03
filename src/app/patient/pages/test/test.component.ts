import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Question, Test } from 'src/app/core/models/test.interface';
import { HistorialService } from 'src/app/core/services/historial.service';
import { TestService } from 'src/app/core/services/test.service';

import Swal from "sweetalert2" ;
import { PatientService } from '../../../core/services/patient.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styles: [
  ]
})
export class TestComponent implements OnInit {
  questions: Question [];
  test: Test;
  id_test: number;
  id_paciente: number;
  isLoading: boolean;
  con: number = 0;
  score: number;
  final: number;
  opcionActiva: string = '';
  id_historial: number;
  myDate: Date;
  dateAux: string;
  mySQLDateString: string;
  currentDate: Date = new Date;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private testService: TestService,
    private historialService: HistorialService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe( ({ id_test }) => this.id_test=id_test );
    this.fetchData();
    this.final=0;
    this.id_historial = Number(this.activatedRoute.snapshot.paramMap.get('id_hist'));
    this.id_paciente = Number(this.activatedRoute.snapshot.paramMap.get('id_pac'));

    const currentDayOfMonth = this.currentDate.getDate();
    const currentMonth = this.currentDate.getMonth(); // Be careful! January is 0, not 1
    const currentYear = this.currentDate.getFullYear();

    this.mySQLDateString = currentYear + "-" + (currentMonth + 1) + "-" + currentDayOfMonth+"T05:00:00.000Z";
  }

  async fetchData(){
    try {
      this.isLoading = true;
      this.test = await this.testService.getTest(this.id_test);
      this.questions = this.test.questions; 
      this.isLoading= false;
      
    } catch (error) {
      this.isLoading= false;
      this.router.navigate(['/auth/login']);
    }
  }

  checkAnswer(response: string){
    switch(response){
      case 'nunca':
        this.score=0;
        break;
      case 'veces':
        this.score=1;
        break;
      case 'muchas':
        this.score=2;
        break;       
      case 'siempre':
        this.score=3;
        break;  
    }
    this.opcionActiva = response;
  }

  siguiente(){
    if(this.opcionActiva.length>0){
      if( this.con < this.questions.length){
        this.con++;
        this.final+=this.score;
      }
      this.opcionActiva='';
    }
  }

  async concluir(){
    try {
      this.isLoading = true;
      await this.historialService.updateHistorial( this.final, this.mySQLDateString, this.id_historial, this.id_paciente );
      this.isLoading = false;
      Swal.fire({
        position: 'top-right',
        icon: 'success',
        text: 'Test registrado con éxito',
        timer: 2000,
        showConfirmButton: false  
      })
      this.router.navigate(['/patient/home']);
    }catch (error) {
      this.isLoading= false;
      this.router.navigate(['/patient/home']);
      Swal.fire({ 
        position: 'top-right',
        title: 'Ha ocurrido un error, inténtalo más tarde.',
        icon: 'error',
        timer: 2000,
        showConfirmButton: false  
      });;
    }
  }
}
