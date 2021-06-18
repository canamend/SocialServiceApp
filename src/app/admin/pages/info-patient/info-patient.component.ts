import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Carer } from 'src/app/core/models/carer.interface';
import { Patient } from 'src/app/core/models/users.interface';
import { PatientService } from 'src/app/core/services/patient.service';

@Component({
  selector: 'app-info-patient',
  templateUrl: './info-patient.component.html',
  styleUrls: ['./info-patient.component.css']
})
export class InfoPatientComponent implements OnInit {
  patient: Patient;
  carer: Carer;

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const username = this.route.snapshot.params['username'];
    this.fetchData(username);
  }
  async fetchData(username: string){
    try {
      this.patient = await this.patientService.getPatient(username);    
      this.carer = await this.patientService.getCarer(this.patient.id_cuidador);
      
    } catch (error) {
      this.router.navigate(['admin/home']);
    }
  }

}
