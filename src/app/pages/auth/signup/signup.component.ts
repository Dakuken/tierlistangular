import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../models/User.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
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
      pseudo: ['', [Validators.required, Validators.max(15), Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    })
  }

  onSubmit() {
    const pseudo = this.signUpForm.get('pseudo')?.value
    const email = this.signUpForm.get('email')?.value
    const password = this.signUpForm.get('password')?.value
    this.authService.createNewUser(email, password,pseudo).then(
      () => {
        console.log('sign up successefuly');
        this.router.navigate(['/home'])
      },
      (error: any) => {
        this.errorMessage = error
        console.log('erreur : ' + error);

      }
    )

  }

}
