import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../core/services/auth.service";
import { REGEX_PHONE } from "./form.regex";
import { nameValidators, accountValidators, ValidateDate, passwordsMatch, AsyncValidators } from "./form.validators";

export const infoPersonForm = new FormGroup({
  nombre: new FormControl('', nameValidators),
  appaterno: new FormControl('', nameValidators),
  apmaterno: new FormControl('', nameValidators),
  fnacimiento: new FormControl('', [Validators.required, ValidateDate]),
  genero: new FormControl('', Validators.required)
});


export const accountForm = (authService: AuthService)=> {

  return new FormGroup({
    usuario: new FormControl('', accountValidators, AsyncValidators.notExistsUsername(authService)),
    contrasenia: new FormControl('', accountValidators),
    contraseniaConfirm: new FormControl('', accountValidators)
    }, {
    validators: passwordsMatch
  });
}


export const parentForm = new FormGroup({
  nombreCuidador: new FormControl('', nameValidators),
  parentesco: new FormControl('', Validators.required),
  generoCuidador: new FormControl('', Validators.required),
  telefono: new FormControl('',[Validators.required, Validators.pattern(REGEX_PHONE)])
});