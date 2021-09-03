import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Test } from '../models/test.interface';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  baseUrl = environment.baseUrl;
  
  constructor(
    private _http: HttpClient
  ) { }
  

  getTest( id_test: number): Promise<Test>{
    const endpoint = `${this.baseUrl}/test/${id_test}`;
    return this._http.get<Test>(endpoint).toPromise();
  }

  getTests(): Promise<Test[]>{
    const endpoint = `${this.baseUrl}/test/all`;
    return this._http.get<Test[]>(endpoint).toPromise();
  }

}
