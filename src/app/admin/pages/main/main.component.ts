import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Admin, Patient } from 'src/app/core/models/users.interface';
import { AdminService } from 'src/app/core/services/admin.service';
import { PatientService } from 'src/app/core/services/patient.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  admin: Admin;
  patients: Patient[];
  isLoading: boolean;

  constructor(
    private router: Router,
    private adminService: AdminService,
    private patientService: PatientService
  ) { 
    this.isLoading = true;
    this.patients = [];
  }

  ngOnInit(): void {
    this.fetchData();
  }

  private async fetchData(){
    try {
      const [ admin, patients ]= await Promise.all([
        this.adminService.fetchAdminData(),
        this.patientService.getPatients()
      ]);
      this.admin = admin;
      this.patients = patients;
      
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      this.router.navigate(['/auth/login'])
    }
  }
  onClickVerMas(username: string){
    this.router.navigate(['/admin/infopatient', username])
  }
}
