import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { AuthService } from '../../core/services/auth.service';

import { accountForm, infoPersonForm, parentForm } from '../../shared/form.model';

@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.css']
})
export class RegisterPatientComponent{

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { 
    this._initForm();
  }

  // Initialize the form.
  private _initForm(){
    this.form = this.fb.group(
      {
        infoPerson: infoPersonForm,
        account: accountForm(this.authService),
        parent: parentForm
      }
    )
  }

  getControl(controlName: string){
    return this.form.get(controlName);
  }

  /**
   * Verify if a control is invalid
   * @param controlName The control's name o path
   * @returns True if invalid, false otherwise.
   */
  isInvalid(controlName: string): boolean{
    const control = this.form.get(controlName);
    
    return control.invalid && control.touched;
  }

  /**
   * Verify if username already exist by inspecting the accountExist error in the username control.
   * @returns True is username already exists, false otherwise.
   */
  usernameExist(): boolean{
    return this.form.get('account.usuario').hasError('accountExists')
  }

  passwordsNotMatch(): boolean{
    return this.form.get('account').errors?.noSonIguales;
  }
  
  onSubmit(){
    // console.log('Nombre: ',this.form.controls['nombre'].value);
     console.log('Activo');
     
  }


}