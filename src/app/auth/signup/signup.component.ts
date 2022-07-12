import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm!: FormGroup;
  errorMessage: string = ''

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

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
    const user = new User(email, firstName, lastName)
    this.authService.createNewUser(user, password).then(
      () => {
        console.log('success');
        this.router.navigate(['/home'])
      },
      (error) => {
        this.errorMessage = error
        console.log('erreur : ' + error);

      }
    )

  }

}
