import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { environment } from 'src/environments/environment'
import { Admin, Patient } from '../models/users.interface';
import { AdminAux } from '../models/admin.interface';

@Injectable()
export class AdminService {
  baseUrl = environment.baseUrl;

  constructor(
    private _http: HttpClient
  ) { }

  fetchAdminData(): Promise<Admin>{
    const endpoint = `${this.baseUrl}/admin`;
    return this._http.get<Admin>(endpoint).toPromise();
  }

  getAdmins(): Promise<AdminAux[]>{
    const endpoint = `${this.baseUrl}/admin/all`;
    return this._http.get<AdminAux[]>(endpoint).toPromise();
  }

  getAdmin(): Promise<Admin>{
    const endpoint = `${this.baseUrl}/admin/`;
    return this._http.get<Admin>(endpoint).toPromise();
  }

}
