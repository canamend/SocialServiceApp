import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css']
})
export class CreateTestComponent implements OnInit {

  form: FormGroup;
  showFootNote: boolean = false;

  constructor(private fb: FormBuilder) {
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

}
