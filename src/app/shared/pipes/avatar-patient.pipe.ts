import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'avatarPatient'
})
export class AvatarPatientPipe implements PipeTransform {

  transform(gender: string): unknown {
    if(gender==='M')  return 'assets/images/avatars/boy.png';
    if(gender==='F')  return 'assets/images/avatars/girl.png'
  }

}
