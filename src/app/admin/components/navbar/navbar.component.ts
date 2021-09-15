import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from 'src/app/core/models/users.interface';
import { PatientService } from 'src/app/core/services/patient.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  menuActive = false;
  inputValue : string = '';
  patients: Patient[];
  isLoading : boolean;
  patientsNames : string[];
  searchValue : string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private patientService: PatientService
  ) {
    this.isLoading = true;
   }

  ngOnInit(): void {
  }

  async fetchData(){
    try {
      this.patients = await this.patientService.getPatients();
      for(var i=0; i<this.patients.length;i++){
        this.patientsNames[i]=`${this.patients[i].nombre} ${this.patients[i].ap_paterno} ${this.patients[i].ap_materno}`;
      }
      
      console.log(this.patientsNames);
      this.isLoading = false;
    }catch (error) {
      this.router.navigate(['admin/home']);
    }
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

  getValueInput() {
    this.inputValue = (<HTMLInputElement>document.getElementById("domTextElement")).value; 
    //document.getElementById("valueInput").innerHTML = inputValue; 
    console.log(this.inputValue);
  }
  
}
