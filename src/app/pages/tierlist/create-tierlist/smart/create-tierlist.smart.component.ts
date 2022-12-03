import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-tierlist.smart',
  template: `<app-create-tierlist [signUpForm]="signUpForm" ></app-create-tierlist>`,
  styles: []
})
export class SmartCreateTierlist implements OnInit {
  signUpForm!: FormGroup;
  errorMessage: string = ''

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.signUpForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
    })
  }
}
