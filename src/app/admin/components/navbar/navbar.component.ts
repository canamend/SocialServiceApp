import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { dataPatient, Patient } from 'src/app/core/models/users.interface';
import { PatientService } from 'src/app/core/services/patient.service';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  menuActive = false;
  patients: Patient[];
  patientsEncontrados: Patient[];
  isLoading : boolean;
  patientName : string;
  patient : dataPatient;
  patientsNames: dataPatient[];
  sugerenciasPacientes: dataPatient[]
  searchValue : string;
  nombre: string = '';
  hayError: boolean= false;
  encontro: boolean;
  mostrarSugerencias:boolean=false;
  newUsername: string ='';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private patientService: PatientService,
    private auth: TokenService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.isLoading = true;
   }

  ngOnInit(): void {
    const username = this.route.snapshot.params['username'];
    this.fetchData(username);
  }

  async fetchData(username: string){
    try {
      this.patients = await this.patientService.getPatients();
      this.patientsNames = new Array();
      for(var i=0; i<this.patients.length;i++){
        this.patientName = `${this.patients[i].nombre} ${this.patients[i].ap_paterno} ${this.patients[i].ap_materno}`;
        this.patientsNames.push( {nombre: this.patientName, id: this.patients[i].id_paciente, username:  this.patients[i].usuario } );
      }
      
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
    this.patientsEncontrados = []; /////verificar si no desaparecen los pacientes buscados
  }

  async buscarPaciente( nombre: string) {
    this.patientsEncontrados = new Array();
    this.nombre = nombre.toUpperCase();
    this.encontro = false;
    for(var i=0; i<this.patientsNames.length;i++){
      if(this.patientsNames[i].nombre.includes(this.nombre)){
        this.encontro = true;
        this.patientsEncontrados.push(await this.patientService.getPatient(this.patientsNames[i].username));
      }
    }
    if(!this.encontro){
      this.hayError=true;
      this.patientsEncontrados = [];
    }else{
      this.hayError=false;
    }
    this.mostrarSugerencias=false;
  }

  onClickVerMas(username: string){
    this.router.navigate(['/admin/infopatient', username])
    this.patientsEncontrados = [];
    this.mostrarSugerencias=false;
  }

  async sugerencias( nombre: string){
    
      this.hayError = false; 
      this.encontro = false;
      this.nombre = nombre.toUpperCase();
      if(nombre!==''){
        this.sugerenciasPacientes = new Array();
        for(var i=0; i<this.patientsNames.length;i++){
          if(this.patientsNames[i].nombre.includes(this.nombre)){
            this.encontro = true;
            this.sugerenciasPacientes.push({nombre:this.patientsNames[i].nombre, id:this.patientsNames[i].id, username:this.patientsNames[i].username});
            this.sugerenciasPacientes = this.sugerenciasPacientes.splice(0,5)
          }
        }
        if(!this.encontro){
          this.hayError=true;
          this.sugerenciasPacientes = [];
          this.mostrarSugerencias=false;
        }else{
          this.hayError=false;
          this.mostrarSugerencias=true;
        }
      }else{
        this.mostrarSugerencias=false;
      }
  }

  cerrarSesion(){
    this.auth.removeToken();
    this.router.navigate(['/auth/login']);
  }
  
}
