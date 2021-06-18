import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
// Intefaces
import { AdminPost } from '../models/admin.interface';
import { Account } from '../models/account.interface';
import { LoginResponse } from '../models/login-response.interface';
import { TokenService } from '../../../core/services/token.service';

@Injectable()
export class AuthService {
  baseUrl = environment.baseUrl;

  constructor(
    private _http: HttpClient,
    private tokenService: TokenService
  ) { }
  
  // registrar una nueva cuenta
  async signUpAccount(account: Account){
    const endpoint = `${this.baseUrl}/account`;
    return this._http.post(endpoint, account).toPromise();
  }

  // Registrar un nuevo administrador
  signUpAdmin(admin: AdminPost, usuario: string){
    const endpoint = `${this.baseUrl}/admin`;
    return this._http.post(endpoint, { ...admin, usuario}).toPromise();
  }

  /**
   * Get an account
   * @param username 
   * @returns  A Observable of the response. 
   * The response is Account type if the account exists, null otherwise.
   */
  getAccount(username: string): Observable<Account>{
    const endpoint = `${this.baseUrl}/account/${username}`;
    return this._http.get<Account>(endpoint)
  }

  login(usuario: string, contrasenia: string): Promise<LoginResponse>{
    const endpoint = `${this.baseUrl}/account/login`;

    return this._http.post<LoginResponse>(endpoint, {usuario, contrasenia})
    .pipe(
      tap( ({rol,token, expiresAt}) =>{
        this.tokenService.removeToken();
        this.tokenService.token = token;
        this.tokenService.expiration = expiresAt;
        this.saveRole(rol);
      })
    ).toPromise();
  }

  private saveRole(role: string){
    localStorage.setItem('role', role);
  }

}