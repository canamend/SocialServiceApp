import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';

// Models
import { Patient } from '../models/users.interface';
import { Carer } from '../models/carer.interface';
import { Historial } from '../models/historial.interface';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  baseUrl = environment.baseUrl;
  
  constructor(
    private _http: HttpClient
  ) { }

  getPatients(): Promise<Patient[]>{
    const endpoint = `${this.baseUrl}/patient/all`;
    return this._http.get<Patient[]>(endpoint).toPromise();
  }
  
  getPatient(username: string ='' ){
    const endpoint = `${this.baseUrl}/patient/${username}`;
    return this._http.get<Patient>(endpoint).toPromise();
  }
  
  getCarer(id: number): Promise<Carer>{
    const endpoint = `${this.baseUrl}/cuidador/${id}`;
    return this._http.get<Carer>(endpoint).toPromise();
  }
  get headers(){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return headers;
  } 
  
  addExpediente(expediente: string, id_admin: number, disponible: number){
    const endpoint = `${this.baseUrl}/expediente`;
    const body = { expediente, id_admin, disponible };    
    return this._http.post(endpoint,body,{ headers: this.headers}).toPromise();
  }
  
}
