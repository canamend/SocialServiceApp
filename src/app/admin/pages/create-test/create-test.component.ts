import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css']
})
export class CreateTestComponent implements OnInit {

  form: FormGroup;
  showFootNote: boolean = false;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog
    ) {
    this.form = this.fb.group({
      preguntas: this.fb.array([]),
    });
  }

  ngOnInit(): void {
  }

  addCreds() {
    const creds = this.form.controls.preguntas as FormArray;
    creds.push(this.fb.group({
      question: '',
      password: '',
      checkbox: false,
    }));
  }

  borrarTest() {

    this.dialog.open( ConfirmarComponent, {
      width: '20%'
    });

  }

}
