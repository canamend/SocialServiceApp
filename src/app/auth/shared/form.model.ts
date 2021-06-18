import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../core/services/auth.service";
import { REGEX_PHONE } from "./form.regex";
import { stringValidators, accountValidators, ValidateDate, passwordsMatch, AsyncValidators } from "./form.validators";

export const infoPersonForm = new FormGroup({
  nombre: new FormControl('', stringValidators),
  appaterno: new FormControl('', stringValidators),
  apmaterno: new FormControl('', stringValidators),
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
  nombreCuidador: new FormControl('', stringValidators),
  parentesco: new FormControl('', Validators.required),
  generoCuidador: new FormControl('', Validators.required),
  telefono: new FormControl('',[Validators.required, Validators.pattern(REGEX_PHONE)])
});