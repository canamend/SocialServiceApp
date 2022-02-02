import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
import { Question, TestInfo, Test } from '../../../core/models/test.interface';
import { TestService } from 'src/app/core/services/test.service';
import Swal from 'sweetalert2';
import { PreguntaFormComponent } from '../../components/pregunta-form/pregunta-form.component';
import { TipoRespuesta } from '../../../core/models/respuesta.interface';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: []
})
export class CreateTestComponent implements OnInit {
  testForm: FormGroup = this.fb.group({
    nombre: [ '', [ Validators.required, Validators.minLength(4), Validators.maxLength(100)] ,  ],
    enfoque: [ '', [ Validators.required, Validators.minLength(4), Validators.maxLength(50)] ,  ],
    keyword: [ '', [ Validators.required, Validators.minLength(4), Validators.maxLength(15) ] , ],
    preguntas: new FormArray([])
  });

  public preguntasTestForm: FormGroup;

  get preguntasArray() {
    return this.preguntasTestForm?.get('preguntas') as FormArray;
  }

  preguntas: Question[] = [];
  test: TestInfo;
  testsInfo: TestInfo[];
  nuevoTest: Test;
  tiposFromChild: TipoRespuesta[];
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
      preguntas: new FormArray([])
    });
  }

  getTiposRespuesta(event: TipoRespuesta[]){
    this.tiposFromChild = event;
  }

  eliminarPregunta( index: number ){
    this.preguntasArray?.removeAt( index );
  }
  agregarPregunta(): void {
    this.preguntasArray?.push( PreguntaFormComponent.agregarPreguntaItem() );
  }

  async guardar() {
    this.testsInfo = await this.testService.getTests();
    let aux: number = 0;

    //se evalua que se asigne un id de test que no exista
    while(this.testsInfo.some(test => test.id_test === aux)){
      aux = aux + 1;
    }

    this.testForm.controls['preguntas'] = this.preguntasTestForm;
    if( this.testForm.invalid || this.preguntasTestForm.invalid ){
      this.testForm.controls;
      this.testForm.markAllAsTouched();
      this.preguntasTestForm.markAllAsTouched();
      return;
    }

    this.nuevoTest = {
      id_test: aux,
      nombre: this.testForm.value.nombre,
      keyword: this.testForm.value.keyword,
      enfoque: this.testForm.value.enfoque,
      questions: []
    }
    for (let i = 0; i < this.preguntasArray.length; i++) {
      let nuevaPregunta: Question = {
        nombre: this.preguntasArray.at(i).value['nombre'],
        descripcion: this.preguntasArray.at(i).value['descripcion'],
        id_test: this.nuevoTest.id_test,
        tipo_respuestas: this.preguntasArray.at(i).value['idRespuesta'],
        url_imagen: this.preguntasArray.at(i).value['url_imagen'],
        factor: this.preguntasArray.at(i).value['factor'],
        tipo_pregunta: null
      }
      this.nuevoTest.questions.push(nuevaPregunta);
    }

    try {
      this.isLoading = true;
      await this.testService.postTest(this.nuevoTest);
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
    }
  }

  borrarTest() {

    this.dialog.open( ConfirmarComponent, {
      width: '20%'
    });

  }

}
