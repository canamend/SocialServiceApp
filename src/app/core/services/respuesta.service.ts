import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Respuesta } from '../models/respuesta.interface';

@Injectable({
  providedIn: 'root'
})
export class RespuestaService {
  
  baseUrl = environment.baseUrl;
  
  constructor(
    private _http: HttpClient
  ) { }

  getRespuestas(): Promise<Respuesta[]>{
    const endpoint = `${this.baseUrl}/respuestas/all`;
    return this._http.get<Respuesta[]>(endpoint).toPromise();
  }

  postRespuestas( respuestas: Respuesta[] ){
    const endpoint = `${this.baseUrl}/respuestas/`;
    return this._http.post(endpoint, respuestas).toPromise();
  }
}
