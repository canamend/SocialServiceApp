import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminAux } from 'src/app/core/models/admin.interface';
import { Carer } from 'src/app/core/models/carer.interface';
import { Historial } from 'src/app/core/models/historial.interface';
import { TestInfo } from 'src/app/core/models/test.interface';
import {  Admin, Patient } from 'src/app/core/models/users.interface';
import { AdminService } from 'src/app/core/services/admin.service';
import { HistorialService } from 'src/app/core/services/historial.service';
import { PatientService } from 'src/app/core/services/patient.service';
import { TestService } from '../../../core/services/test.service';

import Swal from "sweetalert2" ;
import { NombreTestPipe } from 'src/app/shared/pipes/nombre-test.pipe';

@Component({
  selector: 'app-info-patient',
  templateUrl: './info-patient.component.html',
  styleUrls: ['./info-patient.component.css']
})
export class InfoPatientComponent implements OnInit {
  patient: Patient;
  carer: Carer;
  isLoading: boolean;
  historial: Historial[];
  admins: AdminAux[];
  tests: TestInfo[];
  admin : Admin;
  seleccionado: string ='0';
  verSeleccion: number; 
  dateAux: string;
  mySQLDateString: string;
  currentDate: Date = new Date;

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private router: Router,
    private historialService: HistorialService,
    private adminService: AdminService,
    private testService: TestService,
    private pipe: NombreTestPipe
  ) { 
    this.isLoading = true;
  }

  ngOnInit(): void {
    const username = this.route.snapshot.params['username'];
    this.fetchData(username);

    const currentDayOfMonth = this.currentDate.getDate();
    const currentMonth = this.currentDate.getMonth();
    const currentYear = this.currentDate.getFullYear();

    this.mySQLDateString = currentYear + "-" + (currentMonth + 1) + "-" + currentDayOfMonth+"T05:00:00.000Z";

  }
  async fetchData(username: string){
    try {
      this.patient = await this.patientService.getPatient(username);    
      this.carer = await this.patientService.getCarer(this.patient.id_cuidador);
      this.historial = await this.historialService.getHistorial(this.patient.id_paciente);
      this.admins = await this.adminService.getAdmins();
      this.tests = await this.testService.getTests();
      this.admin =await this.adminService.getAdmin();
      this.isLoading = false;
    } catch (error) {
      this.router.navigate(['admin/home']);
    }
  }

  seleccionarTest(){
    this.verSeleccion = parseInt(this.seleccionado);
  }

  async asignarTest(){
    try {
      this.isLoading = true;
      this.historialService.postHistorial(this.verSeleccion, this.patient.id_paciente, this.admin.id_admin, this.mySQLDateString );
      this.isLoading = false;
      Swal.fire({
        position: 'top-right',
        icon: 'success',
        text: `Test de ${this.pipe.transform(this.verSeleccion)} asignado con éxito`,
        timer: 2000,
        showConfirmButton: false  
      })
      this.router.navigate([`/admin/infopatient/${this.patient.usuario}`]);
    }catch (error) {
      this.isLoading= false;
      this.router.navigate(['/admin/home']);
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
