import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/core/models/users.interface';
import { PatientService } from 'src/app/core/services/patient.service';
import { ActivatedRoute } from '@angular/router';
import { HistorialService } from 'src/app/core/services/historial.service';
import { Historial } from 'src/app/core/models/historial.interface';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/core/services/admin.service';
import { AdminAux } from 'src/app/core/models/admin.interface';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {
  patient: Patient;
  isLoading: boolean;
  admins: AdminAux[]; 
  historial: Historial[];
  id: number;
  pa: number;
  nombre: string;

  constructor(
    private router: Router,
    private patientService: PatientService,
    private adminService: AdminService,
    private historialService: HistorialService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    //nombre del paciente

    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id_hist'));
    this.pa = Number(this.activatedRoute.snapshot.paramMap.get('id_pac'));
    this.nombre= String(this.activatedRoute.snapshot.paramMap.get('nom'));
    this.fetchData();
  }

  async fetchData(){
    try {
      this.isLoading = true;
      this.patient = await this.patientService.getPatient(this.nombre);
      this.historial = await this.historialService.getHistorial(this.pa);
      this.admins = await this.adminService.getAdmins();
      this.isLoading= false;
      
    } catch (error) {
      this.isLoading= false;
      this.router.navigate(['/auth/login']);
    }
  }
}
