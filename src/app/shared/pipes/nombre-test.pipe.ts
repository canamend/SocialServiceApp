import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nombreTest'
})
export class NombreTestPipe implements PipeTransform {

  transform( id_test: number ): string {
    switch(id_test){
      case 0: return 'Zarit';
      case 2: return 'Spence';
      
      default: return 'Test no identificado';
    }
  }

}
