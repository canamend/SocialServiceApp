import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from 'src/app/core/models/users.interface';

@Component({
  selector: 'app-lista-pacientes',
  templateUrl: './lista-pacientes.component.html',
  styleUrls: ['./lista-pacientes.component.css']
})
export class ListaPacientesComponent {

  @Input() patients: Patient[]=[];
  constructor(
    private router: Router
  ) { }

  onClickVerMas(username: string){
    this.router.navigate(['/admin/infopatient', username])
  }
}
