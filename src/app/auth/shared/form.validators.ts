import { AbstractControl, ValidationErrors, Validators } from "@angular/forms";
import { REGEX_NAME } from "./form.regex";

// Validators for name control
export const nameValidators = [
  Validators.required, 
  Validators.pattern(REGEX_NAME)
];

export const accountValidators = [
  Validators.required, 
  Validators.minLength(5),
  Validators.maxLength(20)
];

// To validate date
export function ValidateDate(control: AbstractControl) {
  const dateArray = control.value.split('-');

  const year: number = parseInt(dateArray[0]);
  const month: number = parseInt(dateArray[1]) - 1;
  const day: number = parseInt(dateArray[2]);

  const dateTimestamp = new Date(year, month, day).getTime();

  const todayTimestamp = Date.now();

  return (dateTimestamp < todayTimestamp)? null: { dateInvalid: true }
}

export function passwordsMatch(control: AbstractControl): ValidationErrors | null {
  const contrasenia = control.get('contrasenia').value;
  const contraseniaRep = control.get('contraseniaConfirm').value;
  return (contrasenia === contraseniaRep) ?
    null: { noSonIguales: true };
}