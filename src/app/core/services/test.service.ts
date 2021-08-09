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
  

  getTest(): Promise<Test>{
    const endpoint = `${this.baseUrl}/test/2`;
    return this._http.get<Test>(endpoint).toPromise();
  }

}
