import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Carer } from '../models/carer.interface';
import { Patient } from '../models/users.interface';

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
}
