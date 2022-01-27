import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
import { Question, TestInfo } from '../../../core/models/test.interface';
import { TestService } from 'src/app/core/services/test.service';
import Swal from 'sweetalert2';
import { PreguntaFormComponent } from '../../components/pregunta-form/pregunta-form.component';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css']
})
export class CreateTestComponent implements OnInit {
  testForm: FormGroup = this.fb.group({
    nombre: [ '', [ Validators.required, Validators.minLength(4) ] ,  ],
    enfoque: [ '', [ Validators.required, Validators.minLength(4) ] ,  ],
    keyword: [ '', [ Validators.required, Validators.minLength(4) ] , ],
    preguntas: new FormArray([
      PreguntaFormComponent.agregarPreguntaItem()
    ])
  });

  public preguntasTestForm: FormGroup;

  get preguntasArray() {
    return this.preguntasTestForm?.get('preguntas') as FormArray;
  }

  preguntas: Question[] = [];
  test: TestInfo;
  isLoading: boolean; 

  constructor( private fb: FormBuilder,
               public dialog: MatDialog,
               private testService: TestService) {}

  campoEsValido( campo: string ) {
    return this.testForm.controls[campo].errors 
        && this.testForm.controls[campo].touched
  }


  ngOnInit(): void {
    this.generatepreguntasTestForm();
  }

  generatepreguntasTestForm() {
    this.preguntasTestForm = new FormGroup({
      preguntas: new FormArray([
        PreguntaFormComponent.agregarPreguntaItem(),
        PreguntaFormComponent.agregarPreguntaItem(),
      ])
    });
  }

  eliminarPregunta( index: number ){
    this.preguntasArray?.removeAt( index );
  }
  agregarPregunta(): void {
    this.preguntasArray?.push( PreguntaFormComponent.agregarPreguntaItem() );
  }

  async guardar() {
    /*
    if( this.testForm.invalid ){
      this.testForm.markAllAsTouched();
      return;
    }
    console.log(this.testForm.value) */
    //this.testForm.reset();
    //console.log(this.preguntasArr)
    if( this.testForm.invalid ){
      this.testForm.markAllAsTouched();
      this.preguntasTestForm.markAllAsTouched();
      return;
    }
    console.log(this.testForm.value)
    console.log(this.preguntasTestForm.value)
    this.test = {
      nombre: this.testForm.value.nombre,
      keyword: this.testForm.value.keyword,
      enfoque: this.testForm.value.enfoque
    };
    this.preguntas = this.testForm.value.preguntas;
    console.log(this.preguntas);
    /*
    try {
      this.isLoading = true;
      this.testService.postTest(this.test);
      this.isLoading = false;
      Swal.fire({
        position: 'top-right',
        icon: 'success',
        text: 'Test registrado con éxito',
        timer: 2000,
        showConfirmButton: false  
      })
    }catch (error) {
      this.isLoading= false;
      Swal.fire({ 
        position: 'top-right',
        title: 'Ha ocurrido un error, inténtalo más tarde.',
        icon: 'error',
        timer: 2000,
        showConfirmButton: false  
      });;
    } */
  }

  borrarTest() {

    this.dialog.open( ConfirmarComponent, {
      width: '20%'
    });

  }

}
