import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Historial } from '../models/historial.interface';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {
  baseUrl = environment.baseUrl;
  
  constructor(
    private _http: HttpClient
  ) { }
  

  getHistorial(): Promise<Historial[]>{
    const endpoint = `${this.baseUrl}/historial/6`;
    return this._http.get<Historial[]>(endpoint).toPromise();
  }

}