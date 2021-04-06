import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { accountForm, infoPersonForm } from '../../shared/form.model';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css']
})
export class RegisterAdminComponent{
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

  passwordsNotMatch(): boolean{
    return this.form.get('account').errors?.noSonIguales;
  }
  
  onSubmit(){
    // console.log('Nombre: ',this.form.controls['nombre'].value);
     
  }


}
