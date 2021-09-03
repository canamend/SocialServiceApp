import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestInfo } from 'src/app/core/models/test.interface';
import { Patient } from 'src/app/core/models/users.interface';
import { PatientService } from 'src/app/core/services/patient.service';
import { TestService } from 'src/app/core/services/test.service';

@Component({
  selector: 'app-set-test',
  templateUrl: './set-test.component.html',
  styleUrls: ['./set-test.component.css']
})
export class SetTestComponent implements OnInit {
  patients: Patient[];
  isLoading: boolean;
  tests: TestInfo[];
  
  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private router: Router,
    private testService: TestService
  ) { }

  ngOnInit(): void {
    const username = this.route.snapshot.params['username'];
    this.fetchData(username);
  }
  async fetchData(username: string){
    try {
      this.isLoading = true;
      this.patients = await this.patientService.getPatients();
      this.tests =  await this.testService.getTests();    
      this.isLoading = false;
      console.log(this.patients, this.tests);
    } catch (error) {
      this.router.navigate(['admin/home']);
    }
  }

  onClickAsignar(){

  }

}
