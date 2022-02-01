import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Test, TestInfo, Question } from '../models/test.interface';

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

  
  getTestsInfo(): Promise<TestInfo[]>{
    const endpoint = `${this.baseUrl}/test/infoAll`;
    return this._http.get<TestInfo[]>(endpoint).toPromise();
  }

  postTest( test: Test ){
    const endpoint = `${this.baseUrl}/test/`;
    return this._http.post(endpoint, test).toPromise();
  }

  postPreguntas( preguntas: Question[], id_test: number ){
    const endpoint = `${this.baseUrl}/test/${id_test}`;
    return this._http.post(endpoint, preguntas).toPromise();
  }


}
