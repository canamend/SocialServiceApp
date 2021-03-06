import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TipoRespuesta } from '../../../core/models/respuesta.interface';

@Component({
  selector: 'app-pregunta-form',
  templateUrl: './pregunta-form.component.html',
  styles: [
  ]
})
export class PreguntaFormComponent {

  @Input() public preguntasForm: FormGroup;

  @Input() arrayIndex: number;

  @Input() numPreguntas: number;

  @Input() tipos_Respuesta : TipoRespuesta;

  @Output() eliminarPreguntaEvent: EventEmitter<number> = new EventEmitter<number>();
  static reg: string | RegExp = '(http)?s?:?(\/\/[^"\']*\.(?:png|jpg|jpeg|gif|png|svg))';

  get nombreCampo (): FormControl{
    return this.preguntasForm?.get( 'nombre' ) as FormControl;
  }

  get descripcionCampo (): FormControl{
    return this.preguntasForm?.get( 'descripcion' ) as FormControl;
  }

  get puntosCampo (): FormControl{
    return this.preguntasForm?.get( 'puntos' ) as FormControl;
  }

  get keywordCampo (): FormControl{
    return this.preguntasForm?.get( 'keyword' ) as FormControl;
  }

  get urlCampo (): FormControl{
    return this.preguntasForm?.get( 'url_imagen' ) as FormControl;
  }

  get factorCampo (): FormControl{
    return this.preguntasForm?.get( 'factor' ) as FormControl;
  }

  get idRespuestaCampo (): FormControl{
    return this.preguntasForm?.get('idRespuesta') as FormControl;
  }
  
  constructor() { }

  static agregarPreguntaItem (): FormGroup {
    return new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(15), Validators.maxLength(150)]),
      descripcion: new FormControl('', [ Validators.minLength(10), Validators.maxLength(200)]),
      idRespuesta: new FormControl(null, [ Validators.required ] ),
      url_imagen: new FormControl('', [Validators.required, Validators.pattern(this.reg), Validators.maxLength(100)]),
      factor: new FormControl('', [Validators.minLength(5), Validators.maxLength(100)]),
    });
  }

  eliminarPregunta( index: number ) {
    this.eliminarPreguntaEvent.next( index );
  }

  static nonZero(control:FormControl):{ [key: string]: any; } {
    if (Number(control.value) < 0) {
      return {nonZero: true};
    } else {
      return null;
    }
  }

}
