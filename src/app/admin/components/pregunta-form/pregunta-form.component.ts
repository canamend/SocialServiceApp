import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  
  constructor() { }

  static agregarPreguntaItem (): FormGroup {
    return new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]),
      descripcion: new FormControl('', [ Validators.minLength(10), Validators.maxLength(100)]),
      puntos: new FormControl(0, Validators.compose([
                                    Validators.required, PreguntaFormComponent.nonZero ])
                              ),
      url_imagen: new FormControl('', [Validators.required, Validators.pattern(this.reg)]),
      keyword: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]),
      factor: new FormControl('', [Validators.minLength(10), Validators.maxLength(50)]),
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
