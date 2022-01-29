import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Respuesta, TipoRespuesta } from 'src/app/core/models/respuesta.interface';
import { RespuestaService } from 'src/app/core/services/respuesta.service';
import { RespuestaFormComponent } from '../respuesta-form/respuesta-form.component';

@Component({
  selector: 'app-tipos-respuesta',
  templateUrl: './tipos-respuesta.component.html',
  styles: [
  ]
})
export class TiposRespuestaComponent implements OnInit {

  public tipoRespuestaForm: FormGroup;

  get respuestaArray(): FormArray {
    return this.tipoRespuestaForm?.get('respuestas') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private respuestaService: RespuestaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.generateTipoRespuestaForm();
    const username = this.route.snapshot.params['username'];
    this.fetchData(username);
  }

  public generateTipoRespuestaForm(): void{
    this.tipoRespuestaForm = new FormGroup({
      respuestas: new FormArray([
        RespuestaFormComponent.agregarRespuestaItem(),
        RespuestaFormComponent.agregarRespuestaItem(),
      ])
    });
  }
  
  isLoading: boolean;
  respuestas: Respuesta[];
  @Output() tipo_respuesta: TipoRespuesta[] = [];
  seleccionado: string ='0';
  verSeleccion: number;

 

  async fetchData(username: string){
    try{
      this.isLoading = true;
      this.respuestas = await this.respuestaService.getRespuestas();
      var i=0;

      this.respuestas.forEach( answer =>{

        if( this.tipo_respuesta.length === 0 ) {
          let nuevoTipo: TipoRespuesta = {
            tipo_respuesta: answer.tipo_respuestas,
            respuestas: [answer]
          }
          this.tipo_respuesta.push(nuevoTipo);
        }else{
            
            if(this.tipo_respuesta[i].tipo_respuesta === answer.tipo_respuestas ){
              this.tipo_respuesta[i].respuestas.push( answer );
            }else{
              let nuevoTipo: TipoRespuesta = {
                tipo_respuesta: answer.tipo_respuestas,
                respuestas: [answer]
              }
              this.tipo_respuesta.push(nuevoTipo);
              i++;
            }
        }


      });

      //this.tipo_respuesta[this.tipo_respuesta.length-1].tipo_respuesta=this.tipo_respuesta.length;

        //console.log(this.);
      console.log(this.tipo_respuesta)
        
      this.isLoading = false;
    } catch(error){
      this.router.navigate(['admin/home']);
    }
  }

  seleccionarTipo(){
    this.verSeleccion = parseInt(this.seleccionado);
  }

  eliminarRespuesta( index: number ){
    this.respuestaArray?.removeAt( index );
  }

  agregarRespuesta(): void {
    this.respuestaArray?.push( RespuestaFormComponent.agregarRespuestaItem() );
  }

  guardar () {
    if( this.tipoRespuestaForm.invalid ){
      this.tipoRespuestaForm.markAllAsTouched();
      return;
    }
    console.log(this.tipoRespuestaForm.value)
  }

}
