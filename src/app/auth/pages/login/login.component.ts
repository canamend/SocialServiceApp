import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { accountValidators } from '../../shared/form.validators';

import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isLoading: boolean; 
  constructor(
    private router: Router,
    private authService: AuthService
  ) { 
    this.initForm();
  }

  initForm(){
    this.form = new FormGroup({
      username: new FormControl('', accountValidators),
      password: new FormControl('', accountValidators),
    });
  }
  ngOnInit(): void {
  }

  async login(){
    this.isLoading = true;
    const {username, password} = this.form.value;
    try {
      
      const { rol } = await this.authService.login(username, password)
      this.isLoading = false;
      if(rol==='admin_rol')
        this.router.navigate(['/admin/home'])
      else if(rol==='paciente_rol')
        this.router.navigate(['/patient/home'])
    } catch (err) {
      this.isLoading = false;
      const { error } = err;
      await Swal.fire({ 
        title: error.msg,
        icon: 'error'
      });
    }
  }
}
