import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from "@angular/forms";

// Added by @Melkia
// Regular expression to deal with names. Only letters and spaces are allowed.
// TODO: For scalability put all regex in a file 
const REGEX_NAME = /^[a-zA-Z ]{3,30}$/;

@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.css']
})
export class RegisterPatientComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { 
    this._initForm();
  }

  //formGroup =  {
      // personInfo = { formGroup},
      // account = { formGroup }
      // cuidador = {  formGroup}
  // }

  // Initialize the form.
  private _initForm(){
    this.form = this.fb.group(
      {
        nombre: ['', this._nameValidators],
        appaterno: ['', this._nameValidators],
        apmaterno: ['', this._nameValidators],
        fnacimiento: [Validators.required],
        genero: [Validators.required],
        
        usuario: ['', [Validators.required, Validators.minLength(6)]],
        contrasenia: ['', [Validators.required, Validators.minLength(6)]],
        contraseniaConfirm: ['', [Validators.required, Validators.minLength(6)]],
        
        nombreCuidador: ['', Validators.required, ], 
        parentesco: [Validators.required],
        generoCuidador: [Validators.required],
        telefono: ['', Validators.required]

      }
    )
  }

  ngOnInit(): void {
  }

  // Validators for name control
  private get _nameValidators(): Validators []{
    return [
      Validators.required, 
      Validators.pattern(REGEX_NAME)
    ]
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
