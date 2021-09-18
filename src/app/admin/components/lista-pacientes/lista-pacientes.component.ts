import { Component, OnInit, Input } from '@angular/core';
import { Patient } from 'src/app/core/models/users.interface';

@Component({
  selector: 'app-lista-pacientes',
  templateUrl: './lista-pacientes.component.html',
  styleUrls: ['./lista-pacientes.component.css']
})
export class ListaPacientesComponent implements OnInit {

  @Input() patients: Patient[]=[]; 
  constructor() { }

  ngOnInit(): void {
  }

}
