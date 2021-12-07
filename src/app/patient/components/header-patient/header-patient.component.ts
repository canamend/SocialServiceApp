import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/core/services/patient.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-header-patient',
  templateUrl: './header-patient.component.html',
  styleUrls: ['./header-patient.component.css']
})
export class HeaderPatientComponent implements OnInit {

  menuActive = false;
  gender: string;
  constructor(
    private patientService: PatientService,
    private router: Router,
    private auth: TokenService
  ) { }

  ngOnInit(): void {
    this.getGender();
  }

  async getGender(){
    const { genero } = await this.patientService.getPatient();
    this.gender = genero;
  }
  
  onClickMenu(){
    this.menuActive = !this.menuActive;
    let navbarMenu = document.querySelector('.navbar-menu');
    if(this.menuActive){
      navbarMenu.classList.remove('hidden');
      navbarMenu.classList.add('show');
    }else{      
      navbarMenu.classList.remove('show');
      navbarMenu.classList.add('hidden');
    }
  }

  closeMenu(){
    let navbarMenu = document.querySelector('.navbar-menu');
    navbarMenu.classList.remove('show');
    navbarMenu.classList.add('hidden');
    this.menuActive = false;
  }

  cerrarSesion(){
    this.auth.removeToken();
    this.router.navigate(['/auth/login']);
  }

}
