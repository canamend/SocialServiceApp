import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-patient',
  templateUrl: './home-patient.component.html',
  styleUrls: ['./home-patient.component.css']
})
export class HomePatientComponent{

  constructor(
    private router: Router
  ) { }
  onAnswerTest(){
    this.router.navigate(['/patient/test']);
  }
}
