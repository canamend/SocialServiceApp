import { Pipe, PipeTransform } from '@angular/core';
import { AdminAux } from 'src/app/core/models/admin.interface';

@Pipe({
  name: 'psicNombre'
})
export class PsicNombrePipe implements PipeTransform {

  transform( id_admin: number, admins:AdminAux[] ): String {

    for(var i=0; i<admins.length; i++){
      if(id_admin == admins[i].id_admin ){
        return `${admins[i].nombre}  ${admins[i].ap_paterno}`;
      }else{
        return 'Psicologo no registrado';
      }
    }

  }
}
