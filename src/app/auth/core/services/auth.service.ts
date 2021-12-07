import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
// Intefaces
import { AdminPost } from '../models/admin.interface';
import { Account } from '../models/account.interface';
import { LoginResponse } from '../models/login-response.interface';
import { TokenService } from '../../../core/services/token.service';
import { PatientPost } from '../models/patient-post.interface';
import { Carer } from 'src/app/core/models/carer.interface';

@Injectable()
export class AuthService {
  baseUrl = environment.baseUrl;
  account : string;
  constructor(
    private _http: HttpClient,
    private tokenService: TokenService
  ) { }
  
  // registrar una nueva cuenta
  async signUpAccount(account: Account){
    const endpoint = `${this.baseUrl}/account`;
    return this._http.post(endpoint, account).toPromise().catch(this.handleError);
  }

  // Registrar un nuevo administrador
  signUpAdmin(admin: AdminPost, usuario: string){
    const endpoint = `${this.baseUrl}/admin`;
    return this._http.post(endpoint, { ...admin, usuario}).toPromise();
  }

  signUpPatient(patient: PatientPost, account: string ){
    this.account=account;
    const endpoint = `${this.baseUrl}/patient`;
    //const endpoint2 = `${this.baseUrl}/account/${this.account}`;
    return this._http.post(endpoint, { ...patient}).toPromise(); /*.catch( error => { 
      console.error("error catched", error);
      this._http.delete(endpoint2).toPromise();
    }); .pipe(
      catchError(this.handleError)
    );*/
  } 

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      const endpoint = `${this.baseUrl}/account/${this.account}`
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
        this._http.delete(endpoint).toPromise();
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

  addCuidador(carer: Carer): Promise<any>{
    const endpoint = `${this.baseUrl}/cuidador`;
    const body = {
      ...carer,
      nombre: carer.nombre_completo    
    }
    return this._http.post(endpoint,body).toPromise();
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