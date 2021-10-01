import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-input-patients',
  templateUrl: './input-patients.component.html',
  styleUrls: ['./input-patients.component.css']
})
export class InputPatientsComponent /*implements OnInit*/ {

  @Output() onSend: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();
  debouncer: Subject<string> = new Subject();
  nombre: string ='';

  //constructor() { }

  ngOnInit() {
    this.debouncer
      .pipe(
        debounceTime(700)
      )
      .subscribe( nombre =>{
        this.onDebounce.emit( nombre );
      })
  } 

  
  buscarPaciente(){
    this.onSend.emit( this.nombre );
    this.nombre='';
  }

  teclaPresionada( ){
    this.debouncer.next( this.nombre );
  }

}
