import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from '../../core/models/account.interface';
import { Admin } from "../../core/models/admin.interface";

import { AuthService } from '../../core/services/auth.service';
import { accountForm, infoPersonForm } from '../../shared/form.model';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css']
})
export class RegisterAdminComponent{
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
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
  
  async onSubmit(){
    // console.log('Nombre: ',this.form.controls['nombre'].value);
    const account: Account = this.form.value.account;
    account.rol = 'admin_rol';
    const admin: Admin = this.form.value.infoPerson;
    try {
      await this.authService.signUpAccount(account);
      const response = await this.authService.signUpAdmin(admin, account.usuario);
      this.router.navigateByUrl('admin/home');

    } catch (error) {
      console.log(error);
    }
  }


}
