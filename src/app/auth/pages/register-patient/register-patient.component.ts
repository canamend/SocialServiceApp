import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";

import { accountForm, infoPersonForm, parentForm } from '../../shared/form.model';

@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.css']
})
export class RegisterPatientComponent{

  form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { 
    this._initForm();
  }

  // Initialize the form.
  private _initForm(){
    this.form = this.fb.group(
      {
        infoPerson: infoPersonForm,
        account: accountForm,
        parent: parentForm
      }
    )
  }

  getControl(controlName: string){
    return this.form.get(controlName);
  }

  // Verify if a control is invalid
  // Return: true if invalid, false otherwise.
  isInvalid(controlName: string): boolean{
    const control = this.form.get(controlName);
    
    return control.invalid && control.touched;
  }
  
  onSubmit(){
    // console.log('Nombre: ',this.form.controls['nombre'].value);
     
  }
}
