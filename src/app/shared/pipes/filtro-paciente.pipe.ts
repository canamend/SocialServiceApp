import { Pipe, PipeTransform } from '@angular/core';
import { Patient } from 'src/app/core/models/users.interface';

@Pipe({
    name: 'filter'
})
export class FiltroPacientePipe implements PipeTransform {

    transform(patients: string[], prop: string, value: string, method:Method): any {
        if (patients) {
            if (!value) {
              return patients
            } else {
              return patients.filter(obj => this.filter(obj[prop],value, method))
            }
          } else {
            return []
          }
    }

    filter(source :string, target :string, method:Method) : boolean {

        switch(method) {
          case "includes" : return source.includes(target)
          case "equal"  : return source === target
          case "not-equal" : return source !== target
        }
      }
}
    
type Method ="includes" | "equal" | "not-equal"
