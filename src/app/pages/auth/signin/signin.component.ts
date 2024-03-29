import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signUpForm!: FormGroup;
  errorMessage: string = ''

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    })
  }

  onSubmit() {
    const email = this.signUpForm.get('email')?.value
    const password = this.signUpForm.get('password')?.value
    this.authService.signInUser(email, password).then(
      () => {
        console.log('sign in successefuly');
        this.router.navigate(['/home'])
      },
      (error) => {
        this.errorMessage = error
        console.log('erreur : ' + error);
      }
    )

  }

}
