import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Respuesta, TipoRespuesta } from 'src/app/core/models/respuesta.interface';
import { RespuestaService } from 'src/app/core/services/respuesta.service';
import Swal from 'sweetalert2';
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
  nuevoTipoRespuesta: Respuesta[] = [];
  tipo_respuesta: TipoRespuesta[] = [];
  @Output() tiposFromChild: EventEmitter<TipoRespuesta[]> = new EventEmitter<TipoRespuesta[]>()
  seleccionado: string ='0';
  verSeleccion: number;

 

  async fetchData(username: string){
    this.getRespuestas();
  }

  async getRespuestas() {
    this.tipo_respuesta = [];
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
      this.tiposFromChild.emit(this.tipo_respuesta);
        
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

  async guardar () {
    if( this.tipoRespuestaForm.invalid ){
      this.tipoRespuestaForm.markAllAsTouched();
      return;
    }
    console.log(this.tipoRespuestaForm.value) //aqui se imprime como array de respuestas
    let aux: TipoRespuesta ={
      tipo_respuesta: 0,
      respuestas: []
    };
    
    while(this.tipo_respuesta.some(tipo => tipo.tipo_respuesta === aux.tipo_respuesta)){
      aux.tipo_respuesta = aux.tipo_respuesta + 1;
    }

    for (let i = 0; i < this.respuestaArray.length; i++) {
      let nuevaRespuesta: Respuesta = {
        opcion: this.respuestaArray.at(i).value['opcion'],
        puntos: this.respuestaArray.at(i).value['puntos'],
        url_imagen: this.respuestaArray.at(i).value['url_imagen'],
        tipo_respuestas: aux.tipo_respuesta,
      }
      this.nuevoTipoRespuesta.push(nuevaRespuesta);
    }
    try {
      this.isLoading = true;
      await this.respuestaService.postRespuestas(this.nuevoTipoRespuesta); //JSON.stringify(this.tipoRespuestaForm.value)
      Swal.fire({
        position: 'top-right',
        icon: 'success',
        text: 'Respuestas registradas con éxito',
        timer: 2000,
        showConfirmButton: false  
      })
      this.isLoading = false;
      this.tipoRespuestaForm.reset();
    } catch (error) {
      this.isLoading=false
      Swal.fire({ 
        position: 'top-right',
        title: 'Ha ocurrido un error, inténtalo más tarde.',
        icon: 'error',
        timer: 2000,
        showConfirmButton: false  
      });;
    }
    await this.getRespuestas();
    
  }

}
