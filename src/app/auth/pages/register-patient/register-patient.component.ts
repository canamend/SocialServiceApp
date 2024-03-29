import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { Router } from '@angular/router';
import { Carer } from 'src/app/core/models/carer.interface';
import Swal from 'sweetalert2';
import { Account } from '../../core/models/account.interface';
import { PatientPost } from '../../core/models/patient-post.interface';
import { AuthService } from '../../core/services/auth.service';
import { PatientService } from 'src/app/core/services/patient.service';
import { AdminService } from 'src/app/core/services/admin.service';

import { accountForm, infoPersonForm, parentForm } from '../../shared/form.model';
import { Admin } from 'src/app/core/models/users.interface';

@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.css']
})
export class RegisterPatientComponent{
  Administrador: Admin;
  

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private patientService: PatientService,
    private adminService: AdminService
  ) { 
    this._initForm();
  }

  // Initialize the form.
  private _initForm(){
    this.form = this.fb.group(
      {
        infoPerson: infoPersonForm,
        account: accountForm(this.authService),
        parent: parentForm,
        expediente: new FormControl('') //Expediente
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
    account.rol = 'paciente_rol';

    const patient: PatientPost = this.form.value.infoPerson;
    patient.usuario = account.usuario;
    const { nombreCuidador, parentesco, generoCuidador, telefono } = this.form.value.parent;
    const carer: Carer = {
      nombre_completo: nombreCuidador,
      parentesco,
      genero: generoCuidador,
      telefono
    }

    // Init animation
    Swal.fire({
      title: 'Realizando el registro',
      allowOutsideClick: false,
      text: 'Espere por favor'
    });
    Swal.showLoading();

    try {
      const responseCarer = await this.authService.addCuidador(carer);
      patient.id_cuidador = responseCarer.insertId;
      this.Administrador = await this.adminService.getAdmin();

      await this.patientService.addExpediente(this.form.value.expediente,this.Administrador.id_admin, 1);
      patient.no_expediente = this.form.value.expediente;
      patient.nombre = patient.nombre.toUpperCase();
      patient.apmaterno = patient.apmaterno.toUpperCase();
      patient.appaterno = patient.appaterno.toUpperCase();
      await this.authService.signUpAccount(account);
      await this.authService.signUpPatient(patient, account.usuario );
      await Swal.fire({
        title: 'Registro realizado con éxito',
        icon: 'success'
      });
      this.form.reset();
      this.router.navigateByUrl('admin/home');

    } catch (error) {
      console.log(error)
      Swal.fire({ 
        title: 'Hubo un error al realizar el registro',
        icon: 'error'
      });
    }
  }


}

