import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Question, Test } from 'src/app/core/models/test.interface';
import { TestService } from 'src/app/core/services/test.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styles: [
  ]
})
export class TestComponent implements OnInit {
  questions: Question [];
  test: Test;
  isLoading: boolean;
  con: number = 0;
  score: number;
  final: number;
  opcionActiva: string = '';
  constructor(
    private router: Router,
    private testService: TestService
  ) { }

  ngOnInit(): void {
    this.fetchData();
    this.final=0;
  }

  async fetchData(){
    try {
      this.isLoading = true;
      this.test = await this.testService.getTest();
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

  concluir(){
    console.log(this.final);
    this.router.navigate(['/patient/home']);
  }
}
