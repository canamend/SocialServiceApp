import { Component, EventEmitter, Input, Output, } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-respuesta-form',
  templateUrl: './respuesta-form.component.html',
  styles: [
  ]
})
export class RespuestaFormComponent {

  @Input() public respuestaForm: FormGroup;

  @Input() arrayIndex: number;

  @Input() numRespuestas: number;

  @Output() eliminarRespuestaEvent: EventEmitter<number> = new EventEmitter<number>();
  static reg: string | RegExp = '(http)?s?:?(\/\/[^"\']*\.(?:png|jpg|jpeg|gif|png|svg))';

  get opcionCampo (): FormControl{
    return this.respuestaForm?.get( 'opcion' ) as FormControl;
  }

  get puntosCampo (): FormControl{
    return this.respuestaForm?.get( 'puntos' ) as FormControl;
  }

  get urlCampo (): FormControl{
    return this.respuestaForm?.get( 'url_imagen' ) as FormControl;
  }
  
  constructor() { }

  static agregarRespuestaItem (): FormGroup {
    return new FormGroup({
      opcion: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]),
      puntos: new FormControl(0, Validators.compose([
                                    Validators.required, RespuestaFormComponent.nonZero ])
                              ),
      url_imagen: new FormControl('', [Validators.required, Validators.pattern(this.reg)])
    });
  }

  eliminarRespuesta( index: number ) {
    this.eliminarRespuestaEvent.next( index );
  }

  static nonZero(control:FormControl):{ [key: string]: any; } {
    if (Number(control.value) < 0) {
      return {nonZero: true};
    } else {
      return null;
    }
  }

}
