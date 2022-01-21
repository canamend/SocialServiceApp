import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
import { Question, TestInfo } from '../../../core/models/test.interface';
import { TestService } from 'src/app/core/services/test.service';
import Swal from 'sweetalert2';

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
    preguntas: this.fb.array([], Validators.required )
  });

  nuevaPregunta: FormGroup = this.fb.group({ 
    nombre: ['', Validators.required ],
    descripcion: ['', ],
    puntos: [ 0 , Validators.required ],
    urlImagen: ['', Validators.required ],
    factor: ['', ],
  });

  get preguntasArr() {
    return this.testForm.get('preguntas') as FormArray;
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
  }

  agregarPregunta() {
    if( this.nuevaPregunta.invalid ){
      return;
    }

    //this.favoritosArr.push( new FormControl( this.nuevoFavorito.value, Validators.required ) ); //favoritosArray apunta al mismo objeto
    this.preguntasArr.push( this.fb.control(this.nuevaPregunta.value, Validators.required ) )
    //ambos funcionan
    this.nuevaPregunta.reset();
  }

  borrar( index: number ) {
    this.preguntasArr.removeAt(index);
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
    console.log(this.testForm);
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
