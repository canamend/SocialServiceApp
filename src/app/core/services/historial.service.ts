import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Historial } from '../models/historial.interface';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {
  baseUrl = environment.baseUrl;
  
  constructor(
    private _http: HttpClient
  ) { }
  
  postHistorial(id_test : number, id_paciente : number, id_admin : number, f_asignacion : string){
    const endpoint = `${this.baseUrl}/historial`
    const body = { id_test, id_paciente, id_admin, f_asignacion }
    return this._http.post(endpoint,body,{ headers: this.headers}).toPromise();
  }

  getHistorial(patient_id: number): Promise<Historial[]>{
    const endpoint = `${this.baseUrl}/historial/${patient_id}`;
    return this._http.get<Historial[]>(endpoint).toPromise();
  }

  get headers(){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return headers;
  }

  updateHistorial(puntaje: number, fecha_fin: string, historial_id: number, patient_id: number ){
    const endpoint = `${this.baseUrl}/historial/${historial_id}`;
    const body = { puntaje, fecha_fin, historial_id, patient_id};   
    return this._http.post(endpoint,body,{ headers: this.headers}).toPromise();
  }

}