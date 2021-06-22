import { Component, Input, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { PatientService } from 'src/app/core/services/patient.service';

import Swal from "sweetalert2" ;


@Component({
  selector: 'app-add-expediente',
  templateUrl: './add-expediente.component.html',
  styleUrls: ['./add-expediente.component.css']
})
export class AddExpedienteComponent implements OnInit {
  @Input() adminId: number;
  expediente: string;
  isLoading: boolean
  constructor(
    private patientService: PatientService
  ) { }

  ngOnInit(): void {

  }
  async onSubmit(form: NgForm){
    
    if(form.invalid){
      return;
    }
    try {
      this.isLoading = true;
      await this.patientService.addExpediente(this.expediente, this.adminId  , 1);
      this.isLoading = false;
      Swal.fire({
        position: 'top-right',
        icon: 'success',
        text: 'Expediente registrado con éxito',
        timer: 2000,
        showConfirmButton: false  
      })
      form.reset();
    } catch (error) {
      form.reset();
      this.isLoading=false
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
