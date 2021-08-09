import { Pipe, PipeTransform } from '@angular/core';
import { Question } from 'src/app/core/models/test.interface';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( value: Question ):string {
    if(value.id_pregunta){
        return `assets/images/questions/${value.id_pregunta}.jpg`;
    }else{
        return 'assets/heroes/no-image.png'
    }    
}

}
