import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

// Intefaces
import { Admin } from '../models/admin.interface';
import { Account } from '../models/account.interface';

@Injectable()
export class AuthService {
  baseUrl = environment.baseUrl;

  constructor(
    private _http: HttpClient
  ) { }
  
  // registrar una nueva cuenta
  async signUpAccount(account: Account){
    const endpoint = `${this.baseUrl}/account`;
    return this._http.post(endpoint, account).toPromise();
  }

  // Registrar un nuevo administrador
  signUpAdmin(admin: Admin, usuario: string){
    const endpoint = `${this.baseUrl}/admin`;
    return this._http.post(endpoint, { ...admin, usuario}).toPromise();
  }
}
