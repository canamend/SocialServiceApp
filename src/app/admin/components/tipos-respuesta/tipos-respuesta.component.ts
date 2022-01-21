import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Respuesta, TipoRespuesta } from 'src/app/core/models/respuesta.interface';
import { RespuestaService } from 'src/app/core/services/respuesta.service';

@Component({
  selector: 'app-tipos-respuesta',
  templateUrl: './tipos-respuesta.component.html',
  styles: [
  ]
})
export class TiposRespuestaComponent implements OnInit {
  isLoading: boolean;
  respuestas: Respuesta[];
  tipo_respuesta: TipoRespuesta[] = [];
  seleccionado: string ='0';
  verSeleccion: number;

  constructor(
    private respuestaService: RespuestaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const username = this.route.snapshot.params['username'];
    this.fetchData(username);

    
  }

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

}
