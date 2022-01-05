import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestInfo } from 'src/app/core/models/test.interface';
import { Admin, Patient } from 'src/app/core/models/users.interface';
import { PatientService } from 'src/app/core/services/patient.service';
import { TestService } from 'src/app/core/services/test.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { AdminService } from 'src/app/core/services/admin.service';
import { HistorialService } from 'src/app/core/services/historial.service';
import { NombreTestPipe } from 'src/app/shared/pipes/nombre-test.pipe';
import Swal from "sweetalert2" ;

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.css']
})
export class EliminarComponent implements OnInit {

  patients: Patient[];
  admin: Admin;
  isLoading: boolean;
  tests: TestInfo[];
  formPatient: FormGroup;
  seleccionado: string ='0';
  verSeleccion: number;
  dateAux: string;
  mySQLDateString: string;
  currentDate: Date = new Date; 
  patientFormArray: FormArray;

  

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private router: Router,
    private historialService: HistorialService,
    private testService: TestService,
    private adminService: AdminService,
    private pipe: NombreTestPipe, 
    private fbPatient: FormBuilder
  ) { 
    this.formPatient = this.fbPatient.group({
      checkArray: this.fbPatient.array([])
    })
  }

  ngOnInit(): void {
    const username = this.route.snapshot.params['username'];
    this.fetchData(username);
    
    
    this.patientFormArray = <FormArray>this.formPatient.controls.checkArray;
  }
  async fetchData(username: string){
    try {
      this.isLoading = true;
      this.patients = await this.patientService.getPatients();
      this.admin = await this.adminService.getAdmin();
     // console.log(this.tests);    
      this.isLoading = false;
     // console.log(this.patients, this.tests);
    } catch (error) {
      this.router.navigate(['admin/home']);
    }
  }

  onChange(patient_id:number, isChecked: boolean) {
    for(var i=0; i<this.patients.length; i++){
      if(this.patients[i].id_paciente===patient_id){
        if(isChecked) {
          this.patientFormArray.push(new FormControl(this.patients[i].id_paciente));
        } else {
          let index = this.patientFormArray.controls.findIndex(x => x.value == this.patients[i].id_paciente)
          this.patientFormArray.removeAt(index);
        }
      }   
    }
  }

  
  eliminar(){
    try {
      this.isLoading = true;
      for(var i=0; i<this.formPatient.value.checkArray.length;i++){
        for(var j=0; j<this.patients.length; j++)
        if(this.patients[j].id_paciente==this.formPatient.value.checkArray[i]){
          this.patientService.deletePatient(this.patients[j].usuario);
        }
      }
      this.isLoading = false;
      Swal.fire({
        position: 'top-right',
        icon: 'success',
        text: `Eliminado con exito`,
        timer: 2000,
        showConfirmButton: false  
      })
      this.router.navigate([`/admin/settest}`]);
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
