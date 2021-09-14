import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nivelAnsiedad'
})
export class NivelAnsiedadPipe implements PipeTransform {

  transform( puntaje: number ): string {
    if( puntaje < 50){
      return 'Leve';
    }else{
      if( puntaje < 60 ){
        return 'Moderado';
      }else{
        return 'Alto';
      }
    }
  }

}
