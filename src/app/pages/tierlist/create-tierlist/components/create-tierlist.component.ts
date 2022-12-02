import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-tierlist',
  templateUrl: './create-tierlist.component.html',
  styleUrls: ['./create-tierlist.component.scss']
})
export class CreateTierlistComponent implements OnInit {

  signUpForm!: FormGroup;
  errorMessage: string = ''

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.signUpForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    })
  }

  onSubmit() {
    const firstName = this.signUpForm.get('firstName')?.value
    const lastName = this.signUpForm.get('lastName')?.value
    const email = this.signUpForm.get('email')?.value
    const password = this.signUpForm.get('password')?.value
  }


}
