import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from '../../core/models/account.interface';
import { Admin } from "../../core/models/admin.interface";

import { AuthService } from '../../core/services/auth.service';
import { accountForm, infoPersonForm } from '../../shared/form.model';

import Swal from "sweetalert2";

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
        account: accountForm(this.authService),
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
  
  async onSubmit(){

    // Create account by values from the form
    const account: Account = this.form.value.account;
    account.rol = 'admin_rol';
    const admin: Admin = this.form.value.infoPerson;

    // Init animation
    Swal.fire({
      title: 'Realizando el registro',
      allowOutsideClick: false,
      text: 'Espere por favor'
    });
    Swal.showLoading();

    try {
      await this.authService.signUpAccount(account);
      await this.authService.signUpAdmin(admin, account.usuario);
      await Swal.fire({
        title: 'Registro realizado con éxito',
        icon: 'success'
      });
      this.router.navigateByUrl('auth/login');

    } catch (error) {
      await Swal.fire({ 
        title: 'Hubo un error al realizar el registro',
        icon: 'error'
      });
      console.log(error);
    }
  }


}